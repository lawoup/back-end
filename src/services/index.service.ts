import HttpException from '~/exceptions/HttpException';
import { updateManyDeviceToken } from '~/data-layer/deviceToken.data-layer';

class IndexService {
	public async registerDeviceToken(uid: string, token: string): Promise<any> {
		if (!token) {
			throw new HttpException(404, 'Token not found');
		}

		return updateManyDeviceToken({
			args: { user: uid, token },
			updateArgs: { token },
		});
	}
}

export default IndexService;
