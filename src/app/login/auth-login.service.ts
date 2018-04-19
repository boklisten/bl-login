import {Injectable} from '@angular/core';
import {TokenService} from "@wizardcoder/bl-connect";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Router} from "@angular/router";
import {LOGIN_MODULE_SETTINGS} from "./login-module-settings";
import {UserPermission} from "@wizardcoder/bl-model";

@Injectable()
export class AuthLoginService {
	private _login$: Subject<boolean>;
	private _logout$: Subject<boolean>;
	public redirectUrl: string;
	
	constructor(private _tokenService: TokenService, private _router: Router) {
		this._login$ = new Subject<boolean>();
		this._logout$ = new Subject<boolean>();
	}
	
	public isLoggedIn() {
		if (this._tokenService.haveAccessToken()) {
			return true;
		}
		return false;
	}
	
	public login(url?: string) {
		if (this._tokenService.haveAccessToken()) {
			if (this.havePermission(this._tokenService.getAccessTokenBody().permission)) {
				this._login$.next(true);
				if (url) {
					this._router.navigateByUrl(url);
				} else if (this.redirectUrl) {
					this._router.navigateByUrl(this.redirectUrl);
				} else {
					this._router.navigateByUrl(LOGIN_MODULE_SETTINGS.successPath);
				}
			} else {
				this.logout(LOGIN_MODULE_SETTINGS.permissionDeniedPath);
			}
		} else {
			this.logout(LOGIN_MODULE_SETTINGS.logoutPath);
		}
	}
	
	public logout(url?: string) {
		this._tokenService.removeTokens();
		this._logout$.next(true);
		
		if (url) {
			this._router.navigateByUrl(url);
		} else {
			this._router.navigateByUrl(LOGIN_MODULE_SETTINGS.logoutPath);
		}
	}
	
	public onLogin(): Observable<boolean> {
		return this._login$;
	}
	
	public onLogout(): Observable<boolean> {
		return this._logout$;
	}
	
	private havePermission(userPermission: UserPermission): boolean {
		if (LOGIN_MODULE_SETTINGS.permissions) {
			if (LOGIN_MODULE_SETTINGS.permissions.indexOf(userPermission) > -1) {
				return true;
			}
		}
		return false;
	}
	
}

