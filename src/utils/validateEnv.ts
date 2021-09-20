import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
	cleanEnv(process.env, {
		NODE_ENV: str(),
		DOMAIN: str(),
		PORT: port(),
		MONGO_PATH: str(),
		FIREBASE_PROJECT_ID: str(),
		FIREBASE_PRIVATE_KEY: str(),
		FIREBASE_CLIENT_EMAIL: str(),
		AWS_ACCESS_KEY_ID: str(),
		AWS_SECRET_ACCESS_KEY: str(),
		S3_BUCKET: str(),
	});
}

export default validateEnv;
