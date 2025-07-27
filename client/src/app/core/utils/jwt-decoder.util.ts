export interface JwtPayload {
  sub?: string;
  email?: string;
  username?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

export class JwtDecoderUtil {
  static decode(token: string): JwtPayload | null {
    try {
      if (!token) {
        return null;
      }

      // Split the token into parts
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }

      // Decode the payload (second part)
      const payload = parts[1];
      const decodedPayload = this.base64UrlDecode(payload);
      
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  static isExpired(token: string): boolean | null {
    const payload = this.decode(token);
    if (!payload || !payload.exp) {
      return null;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }

  static getExpirationTime(token: string): number | null {
    const payload = this.decode(token);
    return payload?.exp || null;
  }

  static getTimeUntilExpiration(token: string): number | null {
    const expTime = this.getExpirationTime(token);
    if (expTime === null) {
      return null;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return expTime - currentTime;
  }

  static getUserId(token: string): string | null {
    const payload = this.decode(token);
    return payload?.sub || payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
  }

  static getUserEmail(token: string): string | null {
    const payload = this.decode(token);
    return payload?.email || null;
  }

  static getUsername(token: string): string | null {
    const payload = this.decode(token);
    return payload?.username || null;
  }

  static getIssuedAtTime(token: string): number | null {
    const payload = this.decode(token);
    return payload?.iat || null;
  }

  static formatTimestamp(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString();
  }

  private static base64UrlDecode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Invalid base64url string');
    }

    return decodeURIComponent(escape(atob(output)));
  }

  static isValidFormat(token: string): boolean {
    if (!token || typeof token !== 'string') {
      return false;
    }

    // Check if it has the correct format (3 parts separated by dots)
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }

    // Check if each part contains only valid base64url characters
    const base64UrlRegex = /^[A-Za-z0-9_-]+$/;
    return parts.every(part => base64UrlRegex.test(part));
  }
} 