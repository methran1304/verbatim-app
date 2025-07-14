export interface RegisterRequestDTO {
  emailAddress: string;
  username: string;
  password: string;
}
export interface LoginRequestDTO {
  emailAddress: string;
  password: string;
}

export interface TokenResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequestDTO {
  userId: string;
  refreshToken: string;
}