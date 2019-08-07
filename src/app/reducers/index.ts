import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { AuthActionTypes } from 'app/auth/auth.actions';
import { User } from 'app/model/user.model';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';


export interface AppState {

}


export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};


export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [storeFreeze] : [];
