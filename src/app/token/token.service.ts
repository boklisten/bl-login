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
	
	public getAccessTokenBody(): AccessToken {
		try {
			const aToken = this._jwtHelper.decodeToken(this._storageService.getAccessToken());
			return aToken;
		} catch (err) {
			throw new Error('could not decode accessToken: ' + err);
		}
	}
	
	public getAccessToken(): string {
		return this._storageService.getAccessToken();
	}
	
	public accessTokenPermission(): UserPermission {
		try {
			const permission = this.getAccessTokenBody().permission;
			return permission;
		} catch (err) {
			throw new Error('could not decode access token: ' + err);
		}
	}
	
	public store(accessTokenVal: any, refreshTokenVal: any): boolean {
		this._storageService.store(accessTokenVal, refreshTokenVal);
		return true;
	}
	
	public validateResponseDataTokens(data: any[]): {accessToken: string, refreshToken: string} {
		let refreshToken = '';
		let accessToken = '';
		
		for (const d of data) {
			if (!d.data || d.data.length <= 0) {
				throw new Error('data of refreshToken is not defined');
			}
			
			if (!d.documentName) {
				throw new Error('documentName is missing on return data');
			}
		
			if (d.documentName === 'refreshToken') {
				refreshToken = d.data;
			} else if (d.documentName === 'accessToken') {
				accessToken = d.data;
			}
		}
		
		if (!accessToken || accessToken.length <= 0 || !refreshToken || refreshToken.length <= 0) {
			throw new Error('tokens or one of the tokens are not defined');
		}
		
		return {accessToken: accessToken, refreshToken: refreshToken};
	}
	
}
