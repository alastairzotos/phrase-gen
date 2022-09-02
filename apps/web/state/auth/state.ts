import create from 'zustand';
import { CodeResponse } from '@react-oauth/google';

import { FetchStatus } from '../../models';
import { AuthService, IAuthService } from '../../services/auth.service';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../utils/localstorage';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from '../../utils/user';

export interface AuthValues {
  jwt?: string;
  loginStatus?: FetchStatus;
  accessToken?: string;
}

export interface AuthActions {
  initLocalStorage: () => void;
  loginWithGoogle: (response: Omit<CodeResponse, "error" | "error_description" | "error_uri">) => Promise<void>;
  logout: () => void;
}

export type AuthState = AuthValues & AuthActions;

const createAuthState = (initialValues: AuthValues, authService: IAuthService) =>
  create<AuthState>((set) => ({
    ...initialValues,

    initLocalStorage: () => {
      const accessToken = getLocalStorage(ACCESS_TOKEN_LOCALSTORAGE_KEY);
      if (accessToken) {
        set({ accessToken });
      }
    },

    loginWithGoogle: async response => {
      try {
        set({ loginStatus: 'fetching' });

        const accessToken = await authService.loginWithGoogle(response.code);

        setLocalStorage(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
        set({ loginStatus: 'success', accessToken });
      } catch {
        set({ loginStatus: 'failure' });
      }
    },

    logout: () => {
      set({ loginStatus: undefined, accessToken: undefined });
      removeLocalStorage(ACCESS_TOKEN_LOCALSTORAGE_KEY);
    }
  }));

export const useAuthState = createAuthState({}, new AuthService());
