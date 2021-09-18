import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import { IProject } from '~/interfaces/project.interface';
import Project from '~/models/Project';

const createProject = ({ args = {} }: { args: any }): Promise<IProject> => {
	return Project.create(args).then((result) => result.save());
};

const findProject = ({
	args = {},
	sortArgs = { createdAt: -1 },
}: {
	args?: FilterQuery<IProject & mongoose.Document>;
	sortArgs?: object;
}) => {
	return Project.find(args).sort(sortArgs);
};

const deleteOneProject = ({
	args = {},
}: {
	args: FilterQuery<IProject & mongoose.Document>;
}) => {
	return Project.deleteOne(args);
};

const findProjectById = (id: string) => {
	return Project.findById(id);
};

const findProjectAndUpdate = ({
	args = {},
	updateArgs = {},
}: {
	args: FilterQuery<IProject & mongoose.Document>;
	updateArgs: UpdateQuery<IProject>;
}) => {
	return Project.findOneAndUpdate(args, updateArgs, { new: true });
};

const findOneProject = ({
	args = {},
}: {
	args: FilterQuery<IProject & mongoose.Document>;
}) => {
	return Project.findOne(args);
};

export {
	createProject,
	findProject,
	findProjectAndUpdate,
	deleteOneProject,
	findOneProject,
	findProjectById,
};
