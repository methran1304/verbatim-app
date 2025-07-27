import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
    LoginRequestDTO,
    RefreshTokenRequestDTO,
    RegisterRequestDTO,
    TokenResponseDTO,
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

    constructor(private http: HttpClient) {
        const tokenPresent = !!localStorage.getItem('accessToken');
        this.isAuthenticatedSubject = new BehaviorSubject<boolean>(tokenPresent);
        this.payloadSubject = new BehaviorSubject<JwtPayload | null>(null);
        this.payloadSubject.next(JwtDecoderUtil.decode(localStorage.getItem('accessToken') ?? ''));
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
                this.setTokens(response);
                return response;
            })
        );
    }

    refreshToken(
        payload: RefreshTokenRequestDTO,
    ): Observable<TokenResponseDTO> {
        return this.http.post<TokenResponseDTO>(
            `${this.baseUrl}/refresh-token`,
            payload,
        ).pipe(
            tap((response: TokenResponseDTO) => {
                this.setTokens(response);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userPreference');
        localStorage.removeItem('drillPreference');
        this.isAuthenticatedSubject.next(false);
        this.payloadSubject.next(null);
    }

    private setTokens(response: TokenResponseDTO): void {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.setAuthenticated(true);
    }

    setAuthenticated(authenticated: boolean): void {
        this.isAuthenticatedSubject.next(authenticated);
        this.payloadSubject.next(JwtDecoderUtil.decode(localStorage.getItem('accessToken') ?? ''));
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
        const token = localStorage.getItem('accessToken');
        if (!token) return true;
        return JwtDecoderUtil.isExpired(token) || false;
    }

    isTokenExpiringSoon(minutes: number = 5): boolean {
        const token = localStorage.getItem('accessToken');
        if (!token) return true;
        
        const timeUntilExpiration = JwtDecoderUtil.getTimeUntilExpiration(token);
        if (timeUntilExpiration === null) return true;
        
        return timeUntilExpiration < (minutes * 60);
    }

    refreshTokenIfNeeded(): Observable<boolean> {
        const token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        
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
}
