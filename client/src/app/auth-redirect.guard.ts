import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const redirectIfAuthenticatedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');

  if (token) {
    router.navigate(['/drill']);
    return false;
  }
  return true;
};