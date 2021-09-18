import HttpException from '~/exceptions/HttpException';
import { createDeviceToken } from '~/data-layer/deviceToken.data-layer';
import { IDeviceToken } from '~/interfaces/device-token.interface';

class IndexService {
	public async registerDeviceToken(
		uid: string,
		token: string
	): Promise<IDeviceToken> {
		if (!token) {
			throw new HttpException(404, 'Token not found');
		}

		return createDeviceToken({ args: { token, user: uid } });
	}
}

export default IndexService;
