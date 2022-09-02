import create from 'zustand';
import { CodeResponse } from '@react-oauth/google';

import { FetchStatus } from '../../models';
import { AuthService, IAuthService } from '../../services/auth.service';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../utils/localstorage';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from '../../utils/user';
import { FbLoginDetails } from '@bitmetro/phrase-gen-dtos';

export interface AuthValues {
  jwt?: string;
  loginStatus?: FetchStatus;
  accessToken?: string;
}

export interface AuthActions {
  initLocalStorage: () => void;
  logout: () => void;
  loginWithGoogle: (response: Omit<CodeResponse, "error" | "error_description" | "error_uri">) => Promise<void>;
  loginWithFacebook: (response: FbLoginDetails) => Promise<void>;
}

export type AuthState = AuthValues & AuthActions;

const handleLogin = async (
  set: (partial: Partial<AuthState>) => void,
  svcCallback: () => Promise<string>,
) => {
  try {
    set({ loginStatus: 'fetching' });

    const accessToken = await svcCallback();

    setLocalStorage(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
    set({ loginStatus: 'success', accessToken });
  } catch {
    set({ loginStatus: 'failure' });
  }
}

const createAuthState = (initialValues: AuthValues, authService: IAuthService) =>
  create<AuthState>((set) => ({
    ...initialValues,

    initLocalStorage: () => {
      const accessToken = getLocalStorage(ACCESS_TOKEN_LOCALSTORAGE_KEY);
      if (accessToken) {
        set({ accessToken });
      }
    },

    logout: () => {
      set({ loginStatus: undefined, accessToken: undefined });
      removeLocalStorage(ACCESS_TOKEN_LOCALSTORAGE_KEY);
    },

    loginWithGoogle: async response => 
      await handleLogin(set, () => authService.loginWithGoogle(response.code)),

    loginWithFacebook: async response =>
      await handleLogin(set, () => authService.loginWithFacebook(response)),
  }));

export const useAuthState = createAuthState({}, new AuthService());
