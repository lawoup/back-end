import { Router } from 'express';
import Route from '~/interfaces/routes.interface';
import validationMiddleware from '~/middlewares/validation.middleware';
import authenticate from '~/middlewares/auth.middleware';
import { CreateTaskDto } from '~/dtos/tasks.dto';
import TaskController from '~/controllers/task.controller';

class TaskRoute implements Route {
	public path = '/task';
	public router = Router();
	public taskController = new TaskController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		/**
		 * @swagger
		 * /task:
		 *   produces:
		 *   - application/json
		 */

		/**
		 * @swagger
		 * /task:
		 *  get:
		 *   tags:
		 *    - Task
		 *   description: get all tasks
		 *   responses:
		 *    200:
		 *      description: fetch all the tasks
		 */

		/**
		 * @swagger
		 * /task:
		 *  post:
		 *    tags:
		 *     - Task
		 *    description: create a new task
		 *    parameters:
		 *    - name: role
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: role name
		 *    - name: project
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: project name
		 *    - name: taskDate
		 *      in: body
		 *      type: date
		 *      required: true
		 *      description: task date
		 *    - name: description
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: description of the task
		 *    responses:
		 *     201:
		 *       description: Task created
		 *     400:
		 *       description: not all data is given
		 */

		/**
		 * @swagger
		 * /task/{id}:
		 *  delete:
		 *    tags:
		 *     - Task
		 *    description: delete a task
		 *    parameters:
		 *    - name: id
		 *      in: params
		 *      type: string
		 *      required: true
		 *      description: id of task
		 *    responses:
		 *     201:
		 *       description: task deleted
		 */

		this.router.get(
			`${this.path}`,
			authenticate,
			this.taskController.fetchTasks
		);
		this.router.post(
			`${this.path}`,
			validationMiddleware(CreateTaskDto),
			authenticate,
			this.taskController.createTask
		);
		this.router.delete(
			`${this.path}/:id`,
			authenticate,
			this.taskController.deleteTask
		);
	}
}

export default TaskRoute;
