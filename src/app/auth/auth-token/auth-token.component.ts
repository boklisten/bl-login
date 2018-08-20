import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TokenService} from "@wizardcoder/bl-connect";
import {AuthLoginService} from "../../login/auth-login.service";
import {LOGIN_MODULE_SETTINGS} from "../../login/login-module-settings";

@Component({
	selector: 'bl-auth-token',
	templateUrl: './auth-token.component.html',
	styleUrls: ['./auth-token.component.scss']
})
export class AuthTokenComponent implements OnInit {
	public addTokensError: boolean;

	constructor(private _router: Router, private _route: ActivatedRoute, private _tokenService: TokenService,
				private _authLoginService: AuthLoginService) {
	}

	ngOnInit() {
		this._route.paramMap.subscribe((paramMap: ParamMap) => {
			if (!paramMap || !paramMap.get('accessToken') || !paramMap.get('refreshToken')) {
				this._authLoginService.logout('auth/login');
			} else {
				try {
					this._tokenService.addAccessToken(paramMap.get('accessToken'));
					this._tokenService.addRefreshToken(paramMap.get('refreshToken'));
					this._authLoginService.login(LOGIN_MODULE_SETTINGS.successPath);
				} catch (e) {
					this.addTokensError = true;
				}
			}
		});
	}

	onLoginAgainClick() {
		this._router.navigate(['auth/login']);
	}
}
