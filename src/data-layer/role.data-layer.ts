import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import { IRole } from '~/interfaces/role.interface';
import Role from '~/models/Role';

const createRole = ({ args = {} }: { args: any }): Promise<IRole> => {
	return Role.create(args).then((result) => result.save());
};

const findRole = ({
	args = {},
	sortArgs = { createdAt: -1 },
}: {
	args?: FilterQuery<IRole & mongoose.Document>;
	sortArgs?: object;
}) => {
	return Role.find(args).sort(sortArgs);
};

const deleteOneRole = ({
	args = {},
}: {
	args: FilterQuery<IRole & mongoose.Document>;
}) => {
	return Role.deleteOne(args);
};

const findRoleById = (id: string) => {
	return Role.findById(id);
};

const findRoleAndUpdate = ({
	args = {},
	updateArgs = {},
}: {
	args: FilterQuery<IRole & mongoose.Document>;
	updateArgs: UpdateQuery<IRole>;
}) => {
	return Role.findOneAndUpdate(args, updateArgs, { new: true });
};

const findOneRole = ({
	args = {},
}: {
	args: FilterQuery<IRole & mongoose.Document>;
}) => {
	return Role.findOne(args);
};

export {
	createRole,
	findRole,
	findRoleAndUpdate,
	deleteOneRole,
	findOneRole,
	findRoleById,
};
