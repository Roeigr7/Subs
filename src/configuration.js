import { AuthStrategy } from 'lib/auth/strategy';
import { getSiteURL } from 'lib/get-site-url';
import { LogLevel } from 'lib/logger';

export const configuration = {
  site: {
    name: 'Devias Kit Pro',
    description: '',
    colorScheme: 'light',
    themeColor: '#090a0b',
    primaryColor: 'neonBlue',
    url: getSiteURL(),
    version: process.env.VITE_SITE_VERSION || '0.0.0',
  },
  logLevel: process.env.VITE_LOG_LEVEL || LogLevel.ALL,
  auth: { strategy: process.env.VITE_AUTH_STRATEGY || AuthStrategy.CUSTOM },
  auth0: { domain: process.env.VITE_AUTH0_DOMAIN, clientId: process.env.VITE_AUTH0_CLIENT_ID },
  cognito: {
    identityPoolId: process.env.VITE_COGNITO_IDENTITY_POOL_ID,
    userPoolClientId: process.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
    userPoolId: process.env.VITE_COGNITO_USER_POOL_ID,
  },
  firebase: {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    appId: process.env.VITE_FIREBASE_APP_ID,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  },
  supabase: { url: process.env.VITE_SUPABASE_URL, anonKey: process.env.VITE_SUPABASE_ANON_KEY },
  mapbox: { apiKey: process.env.VITE_MAPBOX_API_KEY },
  gtm: { id: process.env.VITE_GOOGLE_TAG_MANAGER_ID },
};
