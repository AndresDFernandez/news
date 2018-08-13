import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
  import { environment } from '../../environments/environment';
  // import {User} from '../model/user.model';
  // import {AuthActions, AuthActionTypes} from '../auth/auth.actions';
  import {storeFreeze} from 'ngrx-store-freeze';
  import {routerReducer} from '@ngrx/router-store';
import { User } from '../model/user.model';
import { AuthActionTypes } from '../auth/auth.actions';
  
  type AuthState = {
    loggedId: boolean,
    user: User
  };
  
  export interface AppState {
    auth: AuthState;
  }

  const initialAuthState: AuthState = {
    loggedId: false,
    user: undefined
  }

  export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer
  };
  

  export const metaReducers: MetaReducer<AppState>[] =
    !environment.production ? [storeFreeze] : [];


    function authReducer(state: AuthState = initialAuthState, action): AuthState {
      switch (action.type) {
        case AuthActionTypes.LoginAction:
        return {
          loggedId: true,
          user: action.payload.user
        };
      
        default: 
         return state;
      }
    }