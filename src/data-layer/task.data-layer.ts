import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import { ITask } from '~/interfaces/task.interface';
import Task from '~/models/Task';
import { PopulateObjectInterface } from '~/interfaces/populate-object.interface';

const createTask = ({ args = {} }: { args: any }): Promise<ITask> => {
	return Task.create(args).then((result) => result.save());
};

const findTask = ({
	args = {},
	sortArgs = { createdAt: -1 },
	populateArgs = [],
}: {
	args?: FilterQuery<ITask & mongoose.Document>;
	sortArgs?: object;
	populateArgs?: PopulateObjectInterface[];
}) => {
	return Task.find(args).populate(populateArgs).sort(sortArgs);
};

const deleteOneTask = ({
	args = {},
}: {
	args: FilterQuery<ITask & mongoose.Document>;
}) => {
	return Task.deleteOne(args);
};

const findTaskById = (id: string) => {
	return Task.findById(id);
};

const findTaskAndUpdate = ({
	args = {},
	updateArgs = {},
}: {
	args: FilterQuery<ITask & mongoose.Document>;
	updateArgs: UpdateQuery<ITask>;
}) => {
	return Task.findOneAndUpdate(args, updateArgs, { new: true });
};

const findOneTask = ({
	args = {},
	sortArgs = { createdAt: -1 },
}: {
	args: FilterQuery<ITask & mongoose.Document>;
	sortArgs?: object;
}) => {
	return Task.findOne(args).sort(sortArgs);
};

export {
	createTask,
	findTask,
	findTaskAndUpdate,
	deleteOneTask,
	findOneTask,
	findTaskById,
};
