import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APP_CONFIG} from "../../app_config";
import {TokenService} from "../../token/token.service";
import * as EmailValidator from 'email-validator';

@Injectable()
export class LocalRegisterService {
	public registerUrl: string;
	
	
	constructor(private _httpClient: HttpClient, private _tokenService: TokenService) {
		this.registerUrl = APP_CONFIG.url.base + '/auth/local/register';
	}
	
	public register(email: string, password: string): Promise<boolean> {
		
		
		if (!EmailValidator.validate(email)) {
			return Promise.reject(new Error('email is not valid'));
		}
		
		return new Promise((resolve, reject) => {
			this._httpClient.post(this.registerUrl, {username: email, password: password}).toPromise().then((resData: any[]) => {
				try {
					const tokens = this._tokenService.validateResponseDataTokens(resData);
					this._tokenService.store(tokens.accessToken, tokens.refreshToken);
				} catch (err) {
					return reject(new Error('there was an error with the data returned'));
				}
				resolve(true);
			}).catch((err) => {
				console.log('the error response', err);
				reject(new Error('could not register'));
			});
		});
	}
}
