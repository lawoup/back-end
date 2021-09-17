import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
	cleanEnv(process.env, {
		NODE_ENV: str(),
		DOMAIN: str(),
		PORT: port(),
	});
}

export default validateEnv;
