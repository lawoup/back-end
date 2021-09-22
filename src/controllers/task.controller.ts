import TaskService from '~/services/task.service';
import { NextFunction, Request, Response } from 'express';
import { CreateTaskDto } from '~/dtos/tasks.dto';

class TaskController {
	public taskService = new TaskService();

	public createTask = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const taskData: CreateTaskDto = req.body;
		const { uid } = req.user;

		try {
			const task = await this.taskService.createTask(taskData, uid);

			res.status(201).json({ data: task, message: 'taskCreated' });
		} catch (error) {
			next(error);
		}
	};

	public fetchTasks = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { uid } = req.user;

		try {
			const tasks = await this.taskService.findTasks(uid);

			res.status(200).json({ data: tasks, message: 'fetchTasks' });
		} catch (error) {
			next(error);
		}
	};

	public deleteTask = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const id = req.params.id as string;
		const { uid } = req.user;

		try {
			const result = await this.taskService.deleteTask(id, uid);

			res.status(200).json({ data: result, message: 'deleteTask' });
		} catch (error) {
			next(error);
		}
	};

	public generateExcel = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { uid } = req.user;

		try {
			const result = await this.taskService.generateExcel(uid);

			res.status(200).json({ data: result, message: 'generateExcel' });
		} catch (error) {
			next(error);
		}
	};

	public downloadExcel = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { uid } = req.user;

		try {
			const { path, name } = await this.taskService.downloadExcel(uid);

			res.status(200).json({ data: { path, name }, message: 'downloadExcel' });
		} catch (error) {
			next(error);
		}
	};

	public usePreviousTemplate = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { uid } = req.user;

		try {
			const result = await this.taskService.usePreviousTemplate(uid);

			res.status(200).json({ data: result, message: 'usePreviousTemplate' });
		} catch (error) {
			next(error);
		}
	};
}

export default TaskController;
