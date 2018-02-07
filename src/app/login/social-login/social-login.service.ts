import {Injectable} from '@angular/core';
import {LoginService} from "bl-connect";

@Injectable()
export class SocialLoginService {
	
	constructor(private _loginService: LoginService) {
	
	}
	
	
	public facebookLogin(): Promise<boolean> {
		return this._loginService.facebookLogin();
	}
	
	public googleLogin(): Promise<boolean> {
		return this._loginService.googleLogin();
	}
	
}
