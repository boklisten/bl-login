import {Injectable} from '@angular/core';
import {LoginService} from "@wizardcoder/bl-connect";
import {BlApiError, BlApiLoginRequiredError, BlApiPermissionDeniedError} from "@wizardcoder/bl-model";

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
				console.log('logged in');
				resolve(true);
			}).catch((blApiErr: BlApiError) => {
				if (blApiErr instanceof BlApiPermissionDeniedError) {
					console.log('loginError: BlPermissionDeniedError');
				} else if (blApiErr instanceof BlApiLoginRequiredError) {
					console.log('loginError: BlLoginRequiredError');
				} else {
					console.log('loginError: there was an error with login in bl-connect', blApiErr);
				}
				
				reject(blApiErr);
			});
		});
	}

}
