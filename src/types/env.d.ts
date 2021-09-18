declare namespace NodeJS {
  interface ProcessEnv {
    DOMAIN: string;
    PORT: string;
    NODE_ENV: string;
    MONGO_PATH: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_PRIVATE_KEY: string;
    FIREBASE_CLIENT_EMAIL: string;
  }
}