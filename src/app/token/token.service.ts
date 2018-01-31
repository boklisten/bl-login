
import {Injectable} from '@angular/core';
import {LocalStorageService} from "angular-2-local-storage";
import {CookieService} from 'ngx-cookie';

@Injectable()
export class TokenService {
	private _accessTokenName: string;
	private _refreshTokenName: string;
	
	constructor(private _localStorage: LocalStorageService, private _cookieService: CookieService) {
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
	
	public store(accessTokenVal: string, refreshTokenVal: string): boolean {
		if (!this._localStorage.isSupported) {
			return this.storeCookie(accessTokenVal, refreshTokenVal);
		}
		
		return this.storeLocalStorage(accessTokenVal, refreshTokenVal);
	}
	
	public remove(key: string): boolean {
		if (!this._localStorage.isSupported) {
			return this.deleteCookie(key);
		}
		this._localStorage.remove(key);
		return true;
	}
	
	public getAccessToken(): string {
		if (!this._localStorage.isSupported) {
			return this.getCookie(this._accessTokenName);
		}
		
		const aToken = this._localStorage.get(this._accessTokenName);
		if (!aToken) {
			throw new Error('could not find accessToken');
		}
		
		return aToken as string;
	}
	
	public getRefreshToken(): string {
		if (!this._localStorage.isSupported) {
			return this.getCookie(this._refreshTokenName);
		}
		
		const aToken = this._localStorage.get(this._refreshTokenName);
		if (!aToken) {
			throw new Error('could not find accessToken');
		}
		
		return aToken as string;
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
	
	private storeCookie(accessTokenVal: string, refreshTokenVal: string): boolean {
		try {
			
			this._cookieService.put(this._accessTokenName, accessTokenVal);
			this._cookieService.put(this._refreshTokenName, refreshTokenVal);
			
		} catch (err) {
			console.log('the erro', err);
			throw new Error('could not make accessToken cookie and refreshToken Cookie');
		}
		return true;
	}
	
	private getCookie(key: string) {
		const val: any = this._cookieService.get(key);
		if (!val) {
			throw new Error('could not find cookie');
		}
		return val;
	}
	
	private deleteCookie(key: string): boolean {
		this._cookieService.remove(key);
		return true;
	}
}
