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
		const TaskData: CreateTaskDto = req.body;
		const { uid } = req.user;

		try {
			const task = await this.taskService.createTask(TaskData, uid);

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
}

export default TaskController;