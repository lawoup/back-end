import { Router } from 'express';
import Route from '~/interfaces/routes.interface';
import validationMiddleware from '~/middlewares/validation.middleware';
import authenticate from '~/middlewares/auth.middleware';
import { CreateProjectDto } from '~/dtos/projects.dto';
import ProjectController from '~/controllers/project.controller';

class ProjectRoute implements Route {
	public path = '/project';
	public router = Router();
	public projectController = new ProjectController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		/**
		 * @swagger
		 * /project:
		 *   produces:
		 *   - application/json
		 */

		/**
		 * @swagger
		 * /project:
		 *  get:
		 *   tags:
		 *    - Project
		 *   description: get all projects
		 *   responses:
		 *    200:
		 *      description: fetch all the projects
		 */

		/**
		 * @swagger
		 * /project:
		 *  post:
		 *    tags:
		 *     - Project
		 *    description: create a new project
		 *    parameters:
		 *    - name: name
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: name of the project
		 *    responses:
		 *     201:
		 *       description: project created
		 *     400:
		 *       description: not all data is given
		 */

		this.router.get(
			`${this.path}`,
			authenticate,
			this.projectController.fetchProjects
		);
		this.router.post(
			`${this.path}`,
			validationMiddleware(CreateProjectDto),
			authenticate,
			this.projectController.createProject
		);
	}
}

export default ProjectRoute;
