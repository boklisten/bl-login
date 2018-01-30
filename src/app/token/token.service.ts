
import {Injectable} from '@angular/core';
import {LocalStorageService} from "angular-2-local-storage";


@Injectable()
export class TokenService {
	private _accessTokenName: string;
	private _refreshTokenName: string;
	
	constructor(private _localStorage: LocalStorageService) {
		this._accessTokenName = 'accessToken';
		this._refreshTokenName = 'refreshToken';
	}
	
	public validate(accessToken: string, refreshToken: string): boolean {
		if (!accessToken) {
			throw new Error('accessToken is empty or undefined');
		}
		
		if (!refreshToken) {
			throw new Error('refreshToken is empty or undefined');
		}
		
		return true;
	}
	
	public store(accessToken: string, refreshToken: string): boolean {
		if (this._localStorage.isSupported) {
			return this.storeLocalStorage(accessToken, refreshToken);
		}
		
		return this.storeCookie(accessToken, refreshToken);
		
		
	}
	
	private storeLocalStorage(accessToken: string, refreshToken: string) {
		if (!this._localStorage.set(this._accessTokenName, accessToken)) {
			throw new Error('could not store accessToken');
		}
		
		if (!this._localStorage.set(this._refreshTokenName, refreshToken)) {
			throw new Error('could not store refreshToken');
		}
		return true;
	}
	
	private storeCookie(accessToken: string, refreshToken: string): boolean {
		const accessTokenCookie = this.createCookie(this._accessTokenName, accessToken);
		const refreshTokenCookie = this.createCookie(this._refreshTokenName, refreshToken);
		
		document.cookie = accessTokenCookie;
		document.cookie = refreshTokenCookie;
		
		return true;
	}
	
	private getCookie(key: string) {
		let res = document.cookie.match(new RegExp(key + '=([^;]+)'));
		if (res && (res = JSON.parse(res[1]))) {
			return res;
		}
	}
	
	private deleteCookie(key: string): boolean {
		document.cookie = [key, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
		return true;
	}
	
	private createCookie(key: string, value: string): string {
		return [key, '=', JSON.stringify(value), '; domain=', window.location.host.toString(), '; path=/;'].join('');
	}
	
	public getAccessToken(): any {
		const aToken = this._localStorage.get(this._accessTokenName);
		if (!aToken) {
			throw new Error('could not find accessToken');
		}
		
		return aToken;
	}
	
}
