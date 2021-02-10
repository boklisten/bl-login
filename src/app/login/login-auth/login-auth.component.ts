import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
	LOGIN_MODULE_SETTINGS,
	LoginModuleSettings,
} from "../login-module-settings";
import { AuthLoginService } from "../auth-login.service";
import { StorageService } from "@boklisten/bl-connect";

@Component({
	selector: "bl-login-auth",
	templateUrl: "./login-auth.component.html",
	styleUrls: ["./login-auth.component.scss"],
})
export class LoginAuthComponent implements OnInit {
	public orUseEmailText: string;
	public forgotPasswordButtonText: string;
	public navigationTitle: string;
	public warning: boolean;
	public warningText: string;
	private redirect: string;
	public providers: LoginModuleSettings["providers"];

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _authLoginService: AuthLoginService,
		private _storageService: StorageService
	) {
		this.orUseEmailText = "or use your email to login";
		this.forgotPasswordButtonText = "forgot password?";
		this.navigationTitle = "Login";
		this.clearWarning();
		this.providers = LOGIN_MODULE_SETTINGS.providers;
	}

	ngOnInit() {
		try {
			this.redirect = this._storageService.get("bl-redirect");
		} catch (e) {}
	}

	public onLogin() {
		this._authLoginService.login(
			this.redirect ? this.redirect : LOGIN_MODULE_SETTINGS.successPath
		);
	}

	public onForgotPassword() {
		this._router.navigate(["./forgot"], { relativeTo: this._route });
	}

	public setWarning(msg: string) {
		this.warning = true;
		this.warningText = msg;
	}

	public clearWarning() {
		this.warningText = "";
		this.warning = false;
	}
}
