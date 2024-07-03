import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { TokenService, StorageService } from "@boklisten/bl-connect";
import { AuthLoginService } from "../../login/auth-login.service";
import { LOGIN_MODULE_SETTINGS } from "../../login/login-module-settings";
import {APP_CONFIG} from "../../app_config";

@Component({
	selector: "bl-auth-token",
	templateUrl: "./auth-token.component.html",
	styleUrls: ["./auth-token.component.scss"],
})
export class AuthTokenComponent implements OnInit {
	public addTokensError: boolean;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _tokenService: TokenService,
		private _authLoginService: AuthLoginService,
		private storageService: StorageService
	) {}

	ngOnInit() {
		let redirect: string;

		try {
			redirect = this.storageService.get("bl-redirect");
		} catch (e) {}


		this._route.queryParams.subscribe((paramMap: Record<string, string>) => {
			if (
				!paramMap ||
				!paramMap[APP_CONFIG.token.accessTokenName] ||
				!paramMap[APP_CONFIG.token.refreshTokenName]
			) {
				this._authLoginService.logout("auth/login");
			} else {
				try {
					this._tokenService.addAccessToken(
						paramMap[APP_CONFIG.token.accessTokenName]
					);
					this._tokenService.addRefreshToken(
						paramMap[APP_CONFIG.token.refreshTokenName]
					);
					this._authLoginService.login(
						redirect ? redirect : LOGIN_MODULE_SETTINGS.successPath
					);
				} catch (e) {
					this.addTokensError = true;
				}
			}
		});
	}

	onLoginAgainClick() {
		this._router.navigate(["auth/login"]);
	}
}
