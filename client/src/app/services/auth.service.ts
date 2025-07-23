import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
    LoginRequestDTO,
    RefreshTokenRequestDTO,
    RegisterRequestDTO,
    TokenResponseDTO,
} from '../models/interfaces/auth.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
        console.log(this.payloadSubject.value);
    }

    register(payload: RegisterRequestDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}/register`, payload);
    }

    login(payload: LoginRequestDTO): Observable<TokenResponseDTO> {
        return this.http.post<TokenResponseDTO>(
            `${this.baseUrl}/login`,
            payload,
        );
    }

    refreshToken(
        payload: RefreshTokenRequestDTO,
    ): Observable<TokenResponseDTO> {
        return this.http.post<TokenResponseDTO>(
            `${this.baseUrl}/refresh-token`,
            payload,
        );
    }

    logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.isAuthenticatedSubject.next(false);
        this.payloadSubject.next(null);
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
}
