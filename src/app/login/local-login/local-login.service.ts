import {Injectable} from '@angular/core';
import {LoginService} from "@boklisten/bl-connect";
import {BlApiError, BlApiLoginRequiredError, BlApiPermissionDeniedError} from "@boklisten/bl-model";

@Injectable()
export class LocalLoginService {

	constructor(private _loginService: LoginService) {
	}

	public login(email: string, password: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (!email || email.length <= 0) {
				reject(new Error('email is empty or undefined'));
			}

			if (!password || password.length <= 0) {
				reject(new Error('password is empty or undefined'));
			}

			this._loginService.login(email, password).then(() => {
				resolve(true);
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}

}
