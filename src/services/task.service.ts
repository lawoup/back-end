import { Workbook } from 'exceljs';
import * as AWS from 'aws-sdk';

import { CreateTaskDto } from '~/dtos/tasks.dto';
import { ITask } from '~/interfaces/task.interface';
import { isEmpty } from 'lodash';
import HttpException from '~/exceptions/HttpException';
import {
	createManyTask,
	deleteOneTask,
	findOneTask,
	findTask,
} from '~/data-layer/task.data-layer';
import dayjs from 'dayjs';
import { findOneUser, findUserAndUpdate } from '~/data-layer/user.data-layer';
import { MONTH } from '~/utils/fetchMonth';
import { IRole } from '~/interfaces/role.interface';
import { IClient } from '~/interfaces/client.interface';
import { IProject } from '~/interfaces/project.interface';
import { FileInfoInterface } from '~/interfaces/file-info.interface';
import { Stream } from 'stream';
import { createClient, findOneClient } from '~/data-layer/client.data-layer';
import { createRole, findOneRole } from '~/data-layer/role.data-layer';
import { createProject, findOneProject } from '~/data-layer/project.data-layer';

class TaskService {
	public async createTask(
		taskData: CreateTaskDto,
		uid: string
	): Promise<ITask[]> {
		if (isEmpty(taskData)) {
			throw new HttpException(400, 'No valid task data found');
		}

		let insertTaskData = [];
		for (let i = 0; i < taskData.tasks.length; i++) {
			let task = taskData.tasks[i];

			if (task.duration > 12) {
				throw new HttpException(400, 'You should probably get a life!');
			}

			const date = dayjs(task.taskDate).date();
			const month = dayjs(task.taskDate).month();
			const year = dayjs(task.taskDate).year();

			const client = await findOneClient({
				args: { _id: task.client._id, user: uid },
			});
			let clientId = task.client._id;
			if (!client) {
				const newClient = await createClient({
					args: { name: task.client.name, user: uid },
				});
				clientId = newClient._id;
			}

			const role = await findOneRole({
				args: { _id: task.role._id, user: uid },
			});
			let roleId = task.role._id;
			if (!role) {
				const newRole = await createRole({
					args: { name: task.role.name, user: uid },
				});
				roleId = newRole._id;
			}

			const project = await findOneProject({
				args: { _id: task.project._id, user: uid },
			});
			let projectId = task.project._id;
			if (!project) {
				const newProject = await createProject({
					args: { name: task.project.name, user: uid },
				});
				projectId = newProject._id;
			}

			insertTaskData.push({
				user: uid,
				role: {
					_id: roleId,
					name: task.role.name,
				},
				client: {
					_id: clientId,
					name: task.client.name,
				},
				project: {
					_id: projectId,
					name: task.project.name,
				},
				taskDate: task.taskDate,
				description: task.description,
				duration: task.duration,
				date,
				month,
				year,
			});
		}

		return createManyTask({ args: insertTaskData });
	}

	public async findTasks(uid: string): Promise<ITask[]> {
		return findTask({
			args: { user: uid },
		});
	}

	public async deleteTask(id: string, uid: string): Promise<Boolean> {
		await deleteOneTask({ args: { _id: id, user: uid } });

		return true;
	}

	public async generateExcel(uid: string): Promise<FileInfoInterface> {
		const tasks = await findTask({
			args: { user: uid },
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
				activeTab: 0,
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

		const stream = new Stream.PassThrough();
		await workBook.xlsx.write(stream);

		let s3 = new AWS.S3({ apiVersion: '2006-03-01' });

		const result = await s3
			.upload({
				Key: `${uid}-${user.name}.xlsx`,
				Bucket: process.env.S3_BUCKET! as string,
				Body: stream,
				ContentType:
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			})
			.promise();

		await findUserAndUpdate({
			args: { _id: uid },
			updateArgs: { filePath: result.Location },
		});

		return { path: result.Location, name: result.Location.split('-')[1] };
	}

	public async downloadExcel(uid: string): Promise<FileInfoInterface> {
		const user = await findOneUser({ args: { _id: uid } });
		if (!user) {
			throw new HttpException(404, 'User not found');
		}

		if (!user.filePath) {
			throw new HttpException(400, 'Please generate an excel first');
		}

		return { path: user.filePath, name: user.filePath.split('-')[1] };
	}

	public async getPreviousTemplate(uid: string): Promise<ITask[]> {
		const lastTask = await findOneTask({
			args: {
				user: uid,
			},
		});
		if (!lastTask) {
			return [];
		}

		return findTask({
			args: {
				user: uid,
				date: lastTask.date,
				month: lastTask.month,
				year: lastTask.year,
			},
		});
	}
}

export default TaskService;
