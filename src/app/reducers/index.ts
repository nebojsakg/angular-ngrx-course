import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { AuthActionTypes } from 'app/auth/auth.actions';
import { User } from 'app/model/user.model';
import { environment } from '../../environments/environment';

type AuthState = {
  loggedIn: boolean,
  user: User
};

export interface AppState {
  auth: AuthState;
}

function authReducer(state: AuthState, action): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {
        loggedIn: true,
        user: action.payload.user
      };
    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
