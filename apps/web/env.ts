
export const getEnv = () => ({
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
  apiUrl: process.env.NEXT_PUBLIC_API_URL as string,
});
