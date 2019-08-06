import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, Login, Logout } from 'app/auth/auth.actions';
import { defer, of } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(
      action => localStorage.setItem('user', JSON.stringify(action.payload.user))
    )
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    })
  );

  @Effect()
  init$ = defer(() => {
    const userData = localStorage.getItem('user');

    if (userData) {
      return of(new Login(JSON.parse(userData)));
    } else {
      return of();
    }
  });

  constructor(private actions$: Actions, private router: Router) {
  }

}
