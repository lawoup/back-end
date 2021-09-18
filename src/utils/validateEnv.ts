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
	});
}

export default validateEnv;
