import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "bl-connect";

@Injectable()
export class LoginService {
	
	constructor(private _tokenService: TokenService) {
	}
	
	isLoggedIn(): boolean {
		return this._tokenService.haveAccessToken();
	}
	
}

