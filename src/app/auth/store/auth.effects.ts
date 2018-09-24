import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import { Router} from '@angular/router';
import * as AuthActions from './auth.actions';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as firebase from 'firebase';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$
    .pipe(
    ofType(AuthActions.TRY_SIGNUP))
    .pipe(map((action: AuthActions.TrySignUp) => {
      return action.payload;
    }))
      .pipe(switchMap((authData: {username: string, password: string}) => {
        return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      }))
    .pipe(switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    }))
    .pipe(mergeMap((token: string) => {
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token,
        }
      ];
    }));

  @Effect()
  authSignIn = this.actions$
    .pipe(
      ofType(AuthActions.TRY_SIGNIN))
    .pipe(map ((authState: AuthActions.TrySignIn) => {
      return authState.payload;
    }))
    .pipe(switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    }))
    .pipe(switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    }))
    .pipe(mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNIN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    }));

  @Effect({dispatch: false})
  authlogout = this.actions$
    .pipe(ofType(AuthActions.LOGOUT))
    .pipe(tap(() => {
      this.router.navigate(['/']);
      }
    ));
  constructor(private actions$: Actions,
              private router: Router) {
  }
}
