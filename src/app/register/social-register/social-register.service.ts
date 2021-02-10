import {Injectable} from '@angular/core';

import {RegisterService} from '@boklisten/bl-connect';
import {BlApiError} from "@boklisten/bl-model";

@Injectable()
export class SocialRegisterService {
	
	constructor(private _registerService: RegisterService) {
	}
	
	facebookRegister() {
		return new Promise((resolve, reject) => {
			this._registerService.facebookRegister().then(() => {
				resolve(true);
			}).catch((blApiError: BlApiError) => {
				reject(blApiError);
			});
		});
	}
	
	googleRegister() {
		return new Promise((resolve, reject) => {
			this._registerService.googleRegister().then(() => {
				resolve(true);
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}
}
