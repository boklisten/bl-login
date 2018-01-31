import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {APP_CONFIG} from "../app_config";
import {StorageService} from "../storage/storage.service";
import {AccessToken, UserPermission} from "bl-model";

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
	
	public decodeAccessToken(): AccessToken {
		try {
			const aToken = this._jwtHelper.decodeToken(this._storageService.getAccessToken());
			return aToken;
		} catch (err) {
			throw new Error('could not decode accessToken: ' + err);
		}
	}
	
	public accessTokenPermission(): UserPermission {
		try {
			const permission = this.decodeAccessToken().permission;
			return permission;
		} catch (err) {
			throw new Error('could not decode access token: ' + err);
		}
	}
	
}
