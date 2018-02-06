import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AccessToken, UserDetail} from "bl-model";
import {APP_CONFIG} from "../../app_config";

@Injectable()
export class RegisterDetailService {
	private _userDetailUrl: string;
	
	constructor(private _httpClient: HttpClient) {
		this._userDetailUrl = APP_CONFIG.url.base + '/userdetails/';
	}
	
	public getUserDetails(): Promise<UserDetail> {
		return Promise.reject('get userDetails: not implemented');
		/*
		const accessToken: AccessToken = this._tokenService.getAccessTokenBody();
		const accessTokenString: string = this._tokenService.getAccessToken();
		const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessTokenString});
		
		return new Promise((resolve, reject) => {
			this._httpClient.get(this._userDetailUrl + accessToken.details, {headers: headers}).toPromise().then((res) => {
				resolve(res['data'][0].data);
			}).catch((err) => {
				reject(new Error('could not get user details!'));
			});
		});
		*/
	}
}
