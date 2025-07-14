import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequestDTO, RefreshTokenRequestDTO, RegisterRequestDTO, TokenResponseDTO } from '../models/interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = `${environment.apiBaseUrl}/auth`;

    constructor(private http: HttpClient) {}

    register(payload: RegisterRequestDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}/register`, payload);
    }

    login(payload: LoginRequestDTO): Observable<TokenResponseDTO> {
        return this.http.post<TokenResponseDTO>(
            `${this.baseUrl}/login`,
            payload
        );
    }

    refreshToken(
        payload: RefreshTokenRequestDTO
    ): Observable<TokenResponseDTO> {
        return this.http.post<TokenResponseDTO>(
            `${this.baseUrl}/refresh-token`,
            payload
        );
    }

    logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}
