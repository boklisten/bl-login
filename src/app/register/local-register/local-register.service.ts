import {Injectable} from '@angular/core';
import {APP_CONFIG} from "../../app_config";
import * as EmailValidator from 'email-validator';
import {RegisterService} from "@boklisten/bl-connect";
import {BlApiError, BlApiLoginRequiredError, BlApiPermissionDeniedError} from "@boklisten/bl-model";

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
				reject(blApiErr);
			});
		});
	}
}
