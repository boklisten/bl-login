import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {APP_CONFIG} from "../app_config";
import {StorageService} from "../storage/storage.service";

@Injectable()
export class TokenService {
	
	constructor(private _jwtHelper: JwtHelperService, private _storageService: StorageService) {
	}
	
	public isAccessTokenValid(): boolean {
		try {
			this._jwtHelper.isTokenExpired(this._storageService.getAccessToken());
		} catch (err) {
			throw new Error('the token is not valid: ' + err);
		}
		return true;
	}
	
	public decodeAccessToken(): any {
		try {
			const aToken = this._jwtHelper.decodeToken(this._storageService.getAccessToken());
			return aToken;
		} catch (err) {
			throw new Error('could not decode accessToken: ' + err);
		}
	}
	
	public accessTokenPermission() {
		/*try {
			const aToken = this.decodeAccessToken();
		}
		*/
	}
	
}
