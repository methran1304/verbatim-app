import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
    LoginRequestDTO,
    RefreshTokenRequestDTO,
    RegisterRequestDTO,
    TokenResponseDTO,
    ForgotPasswordRequestDTO,
    ResetPasswordRequestDTO,
} from '../models/interfaces/auth.interface';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { JwtDecoderUtil, JwtPayload } from '../core/utils/jwt-decoder.util';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = `${environment.apiBaseUrl}/auth`;
    private isAuthenticatedSubject: BehaviorSubject<boolean>;
    private payloadSubject: BehaviorSubject<JwtPayload | null>;
    private refreshInProgress = false;

    constructor(private http: HttpClient, private router: Router) {
        const tokenPresent = !!this.getAccessToken();
        this.isAuthenticatedSubject = new BehaviorSubject<boolean>(tokenPresent);
        this.payloadSubject = new BehaviorSubject<JwtPayload | null>(null);
        this.payloadSubject.next(JwtDecoderUtil.decode(this.getAccessToken() ?? ''));
    }

    register(payload: RegisterRequestDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}/register`, payload);
    }

    login(payload: LoginRequestDTO): Observable<TokenResponseDTO> {
        return this.http.post<TokenResponseDTO>(
            `${this.baseUrl}/login`,
            payload,
        ).pipe(
            map((response: TokenResponseDTO) => {
                this.setTokens(response, payload.rememberMe);
                return response;
            })
        );
    }

    googleSignIn(idToken: string, rememberMe?: boolean): Observable<TokenResponseDTO> {
        return this.http.post<TokenResponseDTO>(
            `${this.baseUrl}/google-signin`,
            { idToken },
        ).pipe(
            map((response: TokenResponseDTO) => {
                this.setTokens(response, rememberMe);
                return response;
            })
        );
    }

    refreshToken(
        payload: RefreshTokenRequestDTO,
    ): Observable<TokenResponseDTO> {
        // prevent multiple simultaneous refresh attempts
        if (this.refreshInProgress) {
            return new Observable<TokenResponseDTO>(subscriber => {
                subscriber.error(new Error('Refresh already in progress'));
            });
        }

        this.refreshInProgress = true;
        
        console.log("Refreshing token");
        
        return this.http.post<TokenResponseDTO>(
            `${this.baseUrl}/refresh-token`,
            payload,
        ).pipe(
            tap((response: TokenResponseDTO) => {
                this.setTokens(response);
                this.refreshInProgress = false;
            }),
            catchError((error) => {
                this.refreshInProgress = false;
                throw error;
            })
        );
    }

    logout(): void {
        // clear both localStorage and sessionStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('rememberMe');

        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('rememberMe');

        localStorage.removeItem('userPreference');
        localStorage.removeItem('drillPreference');
        
        this.isAuthenticatedSubject.next(false);
        this.payloadSubject.next(null);
        this.router.navigate(['/logout']);
    }

    private setTokens(response: TokenResponseDTO, rememberMe: boolean = false): void {
        const storage = rememberMe ? localStorage : sessionStorage;

        storage.setItem('accessToken', response.accessToken);
        storage.setItem('refreshToken', response.refreshToken);
        storage.setItem('rememberMe', rememberMe.toString());

        this.setAuthenticated(true);
    }

    setAuthenticated(authenticated: boolean): void {
        this.isAuthenticatedSubject.next(authenticated);
        this.payloadSubject.next(JwtDecoderUtil.decode(this.getAccessToken() ?? ''));
    }

    getAccessToken(): string | null {
        return sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');
    }

    getRefreshToken(): string | null {
        return sessionStorage.getItem('refreshToken') || localStorage.getItem('refreshToken');
    }

    isRememberMeEnabled(): boolean {
        const rememberMe = sessionStorage.getItem('rememberMe') || localStorage.getItem('rememberMe');
        return rememberMe === 'true';
    }

    getAuthenticated(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }

    getPayload(): Observable<JwtPayload | null> {
        return this.payloadSubject.asObservable();
    }

    getUsername(): Observable<string | null> {
        return this.payloadSubject.pipe(
            map((payload: JwtPayload | null) => payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? null)
        );
    }

    isTokenExpired(): boolean {
        const token = this.getAccessToken();
        if (!token) return true;
        return JwtDecoderUtil.isExpired(token) || false;
    }

    isTokenExpiringSoon(minutes: number = 5): boolean {
        const token = this.getAccessToken();
        if (!token) return true;
        
        const timeUntilExpiration = JwtDecoderUtil.getTimeUntilExpiration(token);
        if (timeUntilExpiration === null) return true;
        
        return timeUntilExpiration < (minutes * 60);
    }

    refreshTokenIfNeeded(): Observable<boolean> {
        const token = this.getAccessToken();
        const refreshToken = this.getRefreshToken();
        
        if (!token || !refreshToken) {
            return new Observable<boolean>(subscriber => {
                subscriber.next(false);
                subscriber.complete();
            });
        }
        
        const userId = JwtDecoderUtil.getUserId(token);
        if (!userId) {
            return new Observable<boolean>(subscriber => {
                subscriber.next(false);
                subscriber.complete();
            });
        }
        
        return this.refreshToken({
            userId: userId,
            refreshToken: refreshToken
        }).pipe(
            map(() => true),
            catchError(() => {
                this.logout();
                return new Observable<boolean>(subscriber => {
                    subscriber.next(false);
                    subscriber.complete();
                });
            })
        );
    }

    forgotPassword(emailAddress: string): Observable<any> {
        const request: ForgotPasswordRequestDTO = { emailAddress };
        return this.http.post(`${this.baseUrl}/forgot-password`, request);
    }

    resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
        const request: ResetPasswordRequestDTO = { token, newPassword, confirmPassword };
        return this.http.post(`${this.baseUrl}/reset-password`, request);
    }
}
