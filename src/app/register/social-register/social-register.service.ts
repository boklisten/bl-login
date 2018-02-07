import {Injectable} from '@angular/core';

import {RegisterService} from 'bl-connect';

@Injectable()
export class SocialRegisterService {
	
	constructor(private _registerService: RegisterService) {
	}
	
	
	register(type: "google" | "facebook"): Promise<boolean> {
		if (type === "google") {
			return this._registerService.googleRegister();
		}
		if (type === "facebook") {
			return this._registerService.facebookRegister();
		}
	}
	
}
