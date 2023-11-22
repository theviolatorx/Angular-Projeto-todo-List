import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { LoginService } from '../auth/services/login.service';

export const authGuard = (activatedRoute: ActivatedRouteSnapshot) => {
  return inject(LoginService)
    .isLoggedIn()
    .pipe(
      map((isLoggedIn) => {
        return isLoggedIn
          ? true
          : createUrlTreeFromSnapshot(activatedRoute, ['/', 'login']);
      })
    );
};
