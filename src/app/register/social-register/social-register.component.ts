import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { APP_CONFIG } from "../../app_config";
import { SocialRegisterService } from "./social-register.service";
import { BlApiError } from "@wizardcoder/bl-model";
import { Router } from "@angular/router";
import { LOGIN_MODULE_SETTINGS } from "../../login/login-module-settings";
import { AuthLoginService } from "../../login/auth-login.service";

@Component({
	selector: "bl-social-register",
	templateUrl: "./social-register.component.html",
	styleUrls: ["./social-register.component.scss"]
})
export class SocialRegisterComponent implements OnInit {
	@Output() warning: EventEmitter<string> = new EventEmitter();
	@Input() agreementConfirmed: boolean;

	public registerFacebookText: string;
	public registerFacebookUrl: string;
	public registerGoogleUrl: string;
	public registerGoogleText: string;
	public registerFeideUrl: string;
	public agreementNotConfirmedText: string;

	constructor(private _router: Router) {
		this.registerFacebookText = "Register with Facebook";
		this.registerGoogleText = "Register with Google";
		this.registerFacebookUrl =
			LOGIN_MODULE_SETTINGS.apiPath + "auth/facebook";
		this.registerGoogleUrl = LOGIN_MODULE_SETTINGS.apiPath + "auth/google";
		this.registerFeideUrl = LOGIN_MODULE_SETTINGS.apiPath + "auth/feide";
		this.agreementNotConfirmedText =
			"You must agree to the user agreement before registering";
	}

	ngOnInit() {}

	public onFacebookRegister() {
		if (!this.agreementConfirmed) {
			this.warning.emit(this.agreementNotConfirmedText);
		} else {
			window.location.href = this.registerFacebookUrl;
		}
	}

	public onGoogleRegister() {
		if (!this.agreementConfirmed) {
			this.warning.emit(this.agreementNotConfirmedText);
		} else {
			window.location.href = this.registerGoogleUrl;
		}
	}

	public onFeideRegister() {
		if (!this.agreementConfirmed) {
			this.warning.emit(this.agreementNotConfirmedText);
		} else {
			window.location.href = this.registerFeideUrl;
		}
	}
}
