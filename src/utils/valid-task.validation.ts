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
							!value[i].role ||
							!value[i].project ||
							!value[i].client ||
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
