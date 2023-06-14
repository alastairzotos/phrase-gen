import getConfig from 'next/config';

export const getEnv = (): Record<string, string> => ({
  apiUrl: getConfig().publicRuntimeConfig.NEXT_PUBLIC_API_URL as string,
  googleClientId: getConfig().publicRuntimeConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
  fbAppId: getConfig().publicRuntimeConfig.NEXT_PUBLIC_FB_APP_ID as string,
});
