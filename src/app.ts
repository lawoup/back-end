import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import morgan from 'morgan';
import * as admin from 'firebase-admin';
import swaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc';
import swaggerUI, { SwaggerOptions } from 'swagger-ui-express';
import { __PROD__ } from '~/constants';
import Routes from '~/interfaces/routes.interface';
import errorMiddleware from '~/middlewares/error.middleware';
import { auth } from 'firebase-admin';

declare global {
	namespace Express {
		import DecodedIdToken = auth.DecodedIdToken;

		interface Request {
			user: DecodedIdToken;
		}
	}
}

class App {
	public app: express.Application;
	public port: string | number;
	public env: boolean;

	constructor(routes: Routes[]) {
		this.app = express();
		this.port = process.env.PORT || 3000;
		this.env = __PROD__;

		this.connectToDatabase();
		this.initializeMiddlewares();
		this.initializeSwagger();
		this.initializeRoutes(routes);
		this.initializeErrorHandling();
		this.initializeNotifications();
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on PORT: ${this.port}`);
		});
	}

	public getServer() {
		return this.app;
	}

	private connectToDatabase() {
		const { MONGO_PATH, NODE_ENV } = process.env;

		try {
			if (NODE_ENV === 'production') {
				mongoose
					.connect(`${MONGO_PATH}`)
					.then(() => console.log('Database connected.'))
					.catch((err) => {
						console.error(err);
					});
			} else if (NODE_ENV === 'staging') {
				mongoose
					.connect(`${MONGO_PATH}`)
					.then(() => console.log('Staging database connected.'));
			} else {
				mongoose
					.connect(`${MONGO_PATH}`)
					.then(() => console.log('Local database connected.'));
			}
		} catch (error) {
			console.log(error);
		}
	}

	private initializeMiddlewares() {
		this.app.use(express.json());
		this.app.use(
			express.urlencoded({
				extended: true,
			})
		);
		this.app.use(cookieParser());

		if (this.env) {
			this.app.use(hpp());
			this.app.use(helmet());
			this.app.use(morgan('combined'));
			this.app.use(
				cors({
					origin: process.env.DOMAIN,
					credentials: true,
				})
			);
		} else {
			this.app.use(morgan('dev'));
			this.app.use(
				cors({
					origin: true,
					credentials: true,
				})
			);
		}
	}

	private initializeRoutes(routes: Routes[]) {
		routes.forEach((route) => this.app.use('/', route.router));
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}

	private initializeNotifications = () => {
		admin.initializeApp({
			credential: admin.credential.cert({
				projectId: process.env.FIREBASE_PROJECT_ID,
				privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
			}),
		});
	};

	private initializeSwagger() {
		const swaggerDefinition: SwaggerDefinition = {
			basePath: '/',
			host: 'sheet.hyremaster.com',
			info: {
				title: 'REST API NEXTPORT',
				version: '1.0.0',
				description: 'API docs for nextport',
			},
		};
		const options: SwaggerOptions = { swaggerDefinition, apis: ['**/*.ts'] };

		const specs = swaggerJSDoc(options);
		this.app.get('/swagger.json', function (_req, res) {
			res.setHeader('Content-Type', 'application/json');
			res.send(specs);
		});
		this.app.use('/swagger', swaggerUI.serve, swaggerUI.setup(specs));
	}
}

export default App;
