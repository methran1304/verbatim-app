import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { ZorroNotificationServiceTsService } from '../../shared/zorro-notification.service.ts.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const notificationService = inject(ZorroNotificationServiceTsService);
    const router = inject(Router);

    // skip token refresh for auth endpoints to avoid infinite loops
    if (req.url.includes('/auth/refresh-token')) {
        return next(req);
    }

    const token = authService.getAccessToken();
    
    if (token) {
        // check if token is expiring soon and refresh proactively
        if (authService.isTokenExpiringSoon(5)) {
            // console.log('Token expiring soon, attempting proactive refresh...');
            const refreshToken = localStorage.getItem('refreshToken');
            const userId = JwtDecoderUtil.getUserId(token);
            
            if (refreshToken && userId) {
                return authService.refreshToken({
                    userId: userId,
                    refreshToken: refreshToken
                }).pipe(
                    switchMap((response) => {
                        // store the new tokens
                        localStorage.setItem('accessToken', response.accessToken);
                        localStorage.setItem('refreshToken', response.refreshToken);
                        
                        // update authentication state
                        authService.setAuthenticated(true);
                        
                        // retry the original request with the new token
                        const newReq = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${response.accessToken}`
                            }
                        });
                        
                        return next(newReq);
                    }),
                    catchError((refreshError) => {
                        // if proactive refresh fails, continue with original request
                        // it will be handled by the 401 error handler below
                        console.warn('Proactive token refresh failed:', refreshError);
                        return next(req);
                    })
                );
            }
        }
        
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            // if we get a 401 and we have a refresh token, try to refresh
            if (error.status === 401 && authService.getRefreshToken()) {
                // console.log('Received 401, attempting token refresh...');
                const refreshToken = authService.getRefreshToken();
                const userId = JwtDecoderUtil.getUserId(token || '');
                
                if (refreshToken && userId) {
                    return authService.refreshToken({
                        userId: userId,
                        refreshToken: refreshToken
                    }).pipe(
                        switchMap((response) => {
                            // console.log('token refresh successful, send original request');
                            // store the new tokens with the same remember me setting
                            const rememberMe = authService.isRememberMeEnabled();
                            const storage = rememberMe ? localStorage : sessionStorage;
                            storage.setItem('accessToken', response.accessToken);
                            storage.setItem('refreshToken', response.refreshToken);
                            
                            // update authentication state
                            authService.setAuthenticated(true);
                            
                            // retry the original request with the new token
                            const newReq = req.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${response.accessToken}`
                                }
                            });
                            
                            return next(newReq);
                        }),
                        catchError((refreshError) => {
                            // if refresh fails, logout the user and redirect to logout page
                            console.error('token refresh failed:', refreshError);
                            authService.logout();
                            router.navigate(['/logout']);
                            return throwError(() => refreshError);
                        })
                    );
                }
            }
            
            // if no refresh token or refresh failed, just throw the original error
            return throwError(() => error);
        })
    );
}; 