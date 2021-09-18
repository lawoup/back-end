import { CreateTaskDto } from '~/dtos/tasks.dto';
import { ITask } from '~/interfaces/task.interface';
import { isEmpty } from 'lodash';
import HttpException from '~/exceptions/HttpException';
import {
	createTask,
	deleteOneTask,
	findTask,
} from '~/data-layer/task.data-layer';
import dayjs from 'dayjs';

class TaskService {
	public async createTask(
		taskData: CreateTaskDto,
		uid: string
	): Promise<ITask> {
		if (isEmpty(taskData)) {
			throw new HttpException(400, 'No valid task data found');
		}

		if (taskData.duration > 12) {
			throw new HttpException(400, 'You should probably get a life!');
		}

		const date = dayjs(taskData.taskDate).date();
		const month = dayjs(taskData.taskDate).month();
		const year = dayjs(taskData.taskDate).year();

		return createTask({
			args: {
				user: uid,
				role: taskData.role,
				client: taskData.client,
				project: taskData.project,
				taskDate: taskData.taskDate,
				description: taskData.description,
				duration: taskData.duration,
				date,
				month,
				year,
			},
		});
	}

	public async findTasks(uid: string): Promise<ITask[]> {
		return findTask({ args: { user: uid } });
	}

	public async deleteTask(id: string, uid: string): Promise<Boolean> {
		await deleteOneTask({ args: { _id: id, user: uid } });

		return true;
	}
}

export default TaskService;
