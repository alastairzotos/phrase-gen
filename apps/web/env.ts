export const getEnv = () => ({
  apiUrl: process.env.NEXT_PUBLIC_API_URL as string,
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
  fbAppId: process.env.NEXT_PUBLIC_FB_APP_ID as string,
});
