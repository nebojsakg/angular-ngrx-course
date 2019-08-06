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


export interface AppState {

}


export const reducers: ActionReducerMap<AppState> = {

};


export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [] : [];
