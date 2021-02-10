import { Injectable } from "@angular/core";
import {
	TokenService,
	UserSessionService,
	UserDetailService
} from "@boklisten/bl-connect";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { LOGIN_MODULE_SETTINGS } from "./login-module-settings";
import { UserPermission } from "@boklisten/bl-model";

@Injectable()
export class AuthLoginService {
	public redirectUrl: string;
	private _login$: Subject<boolean>;
	private _logout$: Subject<boolean>;

	constructor(
		private _tokenService: TokenService,
		private _router: Router,
		private _userSessionService: UserSessionService,
		private _userDetailService: UserDetailService
	) {
		this._login$ = new Subject<boolean>();
		this._logout$ = new Subject<boolean>();
		this.onBlConnectLogout();
	}

	public isLoggedIn() {
		if (this._tokenService.haveAccessToken()) {
			return true;
		}
		return false;
	}

	public login(url?: string) {
		if (this._tokenService.haveAccessToken()) {
			if (
				this.havePermission(
					this._tokenService.getAccessTokenBody().permission
				)
			) {
				this._userDetailService
					.isValid(this._tokenService.getAccessTokenBody().details)
					.then(validObject => {
						this._login$.next(true);
						if (!validObject.valid) {
							this._router.navigateByUrl(
								LOGIN_MODULE_SETTINGS.userDetailNotValidPath
							);
						} else {
							if (url) {
								this._router.navigateByUrl(url);
							} else if (this.redirectUrl) {
								this._router.navigateByUrl(this.redirectUrl);
							} else {
								this._router.navigateByUrl(
									LOGIN_MODULE_SETTINGS.successPath
								);
							}
						}
					})
					.catch(() => {
						this._router.navigateByUrl(
							LOGIN_MODULE_SETTINGS.userDetailNotValidPath
						);
					});
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

	private onBlConnectLogout() {
		this._userSessionService.onLogout().subscribe(() => {
			this.logout();
		});
	}

	private havePermission(userPermission: UserPermission): boolean {
		if (LOGIN_MODULE_SETTINGS.permissions) {
			if (
				LOGIN_MODULE_SETTINGS.permissions.indexOf(userPermission) > -1
			) {
				return true;
			}
		}
		return false;
	}
}
