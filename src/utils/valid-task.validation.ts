import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsValidTask(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'IsValidTask',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any): Promise<boolean> | boolean {
					let flag = true;
					for (let i = 0; i < value.length; i++) {
						if (
							!(value[i].role && value[i].role._id && value[i].role.name) ||
							!(
								value[i].project &&
								value[i].project._id &&
								value[i].project.name
							) ||
							!(
								value[i].client &&
								value[i].client._id &&
								value[i].client.name
							) ||
							!value[i].taskDate ||
							!value[i].description ||
							!value[i].duration
						) {
							flag = false;
						}
					}

					return flag;
				},
			},
		});
	};
}
