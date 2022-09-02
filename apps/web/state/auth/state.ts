import create from 'zustand';
import { CodeResponse } from '@react-oauth/google';
import { LoggedInUserDetails } from '@bitmetro/phrase-gen-dtos';
import * as jwt from 'jsonwebtoken';

import { FetchStatus } from '../../models';
import { AuthService, IAuthService } from '../../services/auth.service';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../utils/localstorage';

const ACCESS_TOKEN_LOCALSTORAGE_KEY = 'phrasegen:access_token';

export interface AuthValues {
  jwt?: string;
  loginStatus?: FetchStatus;
  accessToken?: string;
  userDetails?: LoggedInUserDetails;
}

export interface AuthActions {
  loginWithGoogle: (response: Omit<CodeResponse, "error" | "error_description" | "error_uri">) => Promise<void>;
  logout: () => void;
}

export type AuthState = AuthValues & AuthActions;

const createAuthState = (authService: IAuthService) =>
  create<AuthState>((set, get) => ({
    accessToken: getLocalStorage(ACCESS_TOKEN_LOCALSTORAGE_KEY),

    loginWithGoogle: async response => {
      try {
        set({ loginStatus: 'fetching' });

        const accessToken = await authService.loginWithGoogle(response.code);
        const userDetails = jwt.decode(accessToken) as LoggedInUserDetails;

        setLocalStorage(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
        set({ loginStatus: 'success', accessToken, userDetails });
      } catch {
        set({ loginStatus: 'failure' });
      }
    },

    logout: () => {
      set({ loginStatus: undefined, accessToken: undefined, userDetails: undefined });
      removeLocalStorage(ACCESS_TOKEN_LOCALSTORAGE_KEY);
    }
  }));

export const useAuthState = createAuthState(new AuthService());
