declare namespace NodeJS {
  interface ProcessEnv {
    DOMAIN: string;
    PORT: string;
    NODE_ENV: string;
    MONGO_PATH: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_PRIVATE_KEY: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_STORAGE_BUCKET: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    S3_BUCKET: string;
    ADMIN_EMAIL: string;
  }
}