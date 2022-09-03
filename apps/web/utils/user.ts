import { LoggedInUserDetails } from '@bitmetro/phrase-gen-dtos';
import * as jwt from 'jsonwebtoken';
import { useAuthState } from '../state/auth';

export const ACCESS_TOKEN_LOCALSTORAGE_KEY = 'phrasegen:access_token';

export const getUserDetails = (): LoggedInUserDetails | null => {
  const accessToken = useAuthState.getState().accessToken;
  if (!accessToken) {
    return null;
  }
  
  return jwt.decode(accessToken) as LoggedInUserDetails;
}
