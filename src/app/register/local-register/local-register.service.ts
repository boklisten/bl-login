import {Injectable} from '@angular/core';
import {APP_CONFIG} from "../../app_config";
import * as EmailValidator from 'email-validator';
import {RegisterService} from "bl-connect";
import {BlApiError, BlApiLoginRequiredError, BlApiPermissionDeniedError} from "bl-model";

@Injectable()
export class LocalRegisterService {
	public registerUrl: string;
	
	
	constructor(private _registerService: RegisterService) {
		this.registerUrl = APP_CONFIG.url.base + '/auth/local/register';
	}
	
	public register(email: string, password: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._registerService.localRegister(email, password).then(() => {
				resolve(true);
			}).catch((blApiErr: BlApiError) => {
				if (blApiErr instanceof BlApiPermissionDeniedError) {
					console.log('PermissionDeniedError');
				} else if (blApiErr instanceof BlApiLoginRequiredError) {
					console.log('LoginRequiredError');
				} else {
					console.log('the register err', blApiErr);
				}
				reject(blApiErr);
			});
		});
	}
}
