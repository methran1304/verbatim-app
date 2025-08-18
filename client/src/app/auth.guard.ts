import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtDecoderUtil } from './core/utils/jwt-decoder.util';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const token = authService.getAccessToken();

    if (token && !JwtDecoderUtil.isExpired(token)) {
        return true;
    } else {
        // clear any invalid tokens
        authService.logout();
        return false;
    }
};
