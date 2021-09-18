import { IDeviceToken } from '~/interfaces/device-token.interface';
import DeviceToken from '~/models/DeviceToken';
import mongoose, { FilterQuery } from 'mongoose';

const createDeviceToken = ({
	args = {},
}: {
	args: any;
}): Promise<IDeviceToken> => {
	return DeviceToken.create(args).then((result) => result.save());
};

const findDeviceToken = ({
	args = {},
	selectArgs = '',
	sortArgs = { createdAt: -1 },
}: {
	args?: FilterQuery<IDeviceToken & mongoose.Document>;
	selectArgs?: string;
	sortArgs?: object;
}) => {
	return DeviceToken.find(args).select(selectArgs).sort(sortArgs).lean();
};

const findOneDeviceToken = ({
	args = {},
}: {
	args: FilterQuery<IDeviceToken & mongoose.Document>;
}) => {
	return DeviceToken.findOne(args);
};

export { createDeviceToken, findDeviceToken, findOneDeviceToken };
