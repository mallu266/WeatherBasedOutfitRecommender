import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const apiKey = localStorage.getItem('weatherApiKey');
  const router: Router = inject(Router);
  if (apiKey) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};