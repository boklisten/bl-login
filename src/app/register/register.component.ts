import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthLoginService } from "../login/auth-login.service";
import { LOGIN_MODULE_SETTINGS } from "../login/login-module-settings";
import { StorageService } from "@wizardcoder/bl-connect";

@Component({
	selector: "bl-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
	public orUseEmailRegisterText: string;
	public navigationTitle: string;
	public useSocialRegisterText: string;
	public agreementConfirmed: boolean;
	public agreementNotConfirmed: boolean;
	private _agreementNotConfirmedText: string;

	public warning: boolean;
	public warningText: string;
	private redirect: string;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _authLoginService: AuthLoginService,
		private storageService: StorageService
	) {
		this.orUseEmailRegisterText = "or use your email to register";
		this.useSocialRegisterText = "use a social account to register";
		this.navigationTitle = "Register";
		this.agreementConfirmed = false;
		this._agreementNotConfirmedText =
			"You need to confirm the agreement to register";
		this.agreementNotConfirmed = false;
	}

	ngOnInit() {
		try {
			this.redirect = this.storageService.get("bl-redirect");
		} catch (e) {}
	}

	public onNavigateBack() {
		this._router.navigate(["../menu"], { relativeTo: this._route });
	}

	public onConfirmedAgreement(confirmed: boolean) {
		this.agreementConfirmed = true;
		this.clearWarning();
	}

	public onDismissedAgreement(dismissed: boolean) {
		this.agreementConfirmed = false;
		this.clearWarning();
	}

	public onRegistered() {
		this.clearWarning();
		this._authLoginService.login(
			this.redirect
				? this.redirect
				: LOGIN_MODULE_SETTINGS.registerSuccessPath
		);
	}

	public onRegisterWithoutAgreement() {
		this.agreementNotConfirmed = true;
	}

	public setWarning(msg: string) {
		this.warning = true;
		this.warningText = msg;
	}

	public clearWarning() {
		this.warning = false;
		this.warningText = "";
		this.agreementNotConfirmed = false;
	}
}
