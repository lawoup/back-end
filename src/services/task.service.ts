import { Workbook } from 'exceljs';

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
import { findOneUser } from '~/data-layer/user.data-layer';
import { MONTH } from '~/utils/fetchMonth';
import { IRole } from '~/interfaces/role.interface';
import { IClient } from '~/interfaces/client.interface';
import { IProject } from '~/interfaces/project.interface';

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

	public async generateExcel(uid: string): Promise<Boolean> {
		const tasks = await findTask({
			args: { user: uid },
			populateArgs: [{ path: 'role' }, { path: 'client' }, { path: 'project' }],
		});

		const user = await findOneUser({ args: { _id: uid } });
		if (!user) {
			throw new HttpException(404, 'User not found');
		}
		const yearFormattedTasks: any = {};
		for (let i = 0; i < tasks.length; i++) {
			const task = tasks[i];
			if (yearFormattedTasks[task.year]) {
				yearFormattedTasks[task.year].push(task);
			} else {
				yearFormattedTasks[task.year] = [task];
			}
		}
		const years = Object.keys(yearFormattedTasks);
		const yearAndMonthFormattedTasks: any = {};
		for (let i = 0; i < years.length; i++) {
			const year = years[i];
			const yearTasks = yearFormattedTasks[year];

			const monthFormattedTasks: any = {};
			for (let j = 0; j < yearTasks.length; j++) {
				const yearTask = yearTasks[j];
				if (monthFormattedTasks[yearTask.month]) {
					monthFormattedTasks[yearTask.month].push(yearTask);
				} else {
					monthFormattedTasks[yearTask.month] = [yearTask];
				}
			}
			yearAndMonthFormattedTasks[year] = monthFormattedTasks;
		}

		const workBook = new Workbook();
		workBook.creator = user.name;
		workBook.created = dayjs().toDate();
		workBook.views = [
			{
				x: 5,
				y: 5,
				width: 10000,
				height: 20000,
				firstSheet: 0,
				activeTab: 1,
				visibility: 'visible',
			},
		];
		Object.keys(yearAndMonthFormattedTasks).forEach((year) => {
			Object.keys(yearAndMonthFormattedTasks[year]).forEach((month) => {
				const tasks = yearAndMonthFormattedTasks[year][month];
				let formattedTasks = tasks.map((task: ITask) => [
					(task.role as IRole).name,
					task.taskDate,
					task.description,
					(task.client as IClient).name,
					(task.project as IProject).name,
					task.duration,
				]);
				const sheet = workBook.addWorksheet(`${MONTH[+month]} ${+year}`, {
					pageSetup: { paperSize: 9, orientation: 'landscape' },
					properties: {
						defaultColWidth: 20,
					},
				});

				sheet.addTable({
					name: `${MONTH[+month]} ${+year}`,
					ref: 'A1',
					headerRow: true,
					style: {
						theme: 'TableStyleDark3',
						showRowStripes: true,
					},
					columns: [
						{ name: 'Employee Role' },
						{ name: 'Date' },
						{ name: 'Description' },
						{ name: 'Client Name' },
						{ name: 'Project Name' },
						{
							name: 'Total Duration',
						},
					],
					rows: [...formattedTasks],
				});
			});
		});

		await workBook.xlsx.writeFile(`./src/assets/${user.name}.xlsx`);

		return true;
	}
}

export default TaskService;
