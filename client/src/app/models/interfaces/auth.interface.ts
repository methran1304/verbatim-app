export interface RegisterRequestDTO {
    emailAddress: string;
    username: string;
    password: string;
}
export interface LoginRequestDTO {
    emailAddress: string;
    password: string;
    rememberMe?: boolean;
}

export interface TokenResponseDTO {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshTokenRequestDTO {
    userId: string;
    refreshToken: string;
}

export interface ForgotPasswordRequestDTO {
    emailAddress: string;
}

export interface ResetPasswordRequestDTO {
    token: string;
    newPassword: string;
    confirmPassword: string;
}