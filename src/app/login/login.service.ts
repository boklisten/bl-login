import {Injectable} from '@angular/core';
import {TokenService} from "@wizardcoder/bl-connect";

@Injectable()
export class LoginService {
	
	constructor(private _tokenService: TokenService) {
	}
	
	isLoggedIn(): boolean {
		return this._tokenService.haveAccessToken();
	}
	
}

