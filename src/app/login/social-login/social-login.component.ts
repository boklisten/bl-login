import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { APP_CONFIG } from "../../app_config";
import { SocialLoginService } from "./social-login.service";
import { BlApiError } from "@wizardcoder/bl-model";
import {
	LOGIN_MODULE_SETTINGS,
	LoginModuleSettings
} from "../login-module-settings";

@Component({
	selector: "bl-social-login",
	templateUrl: "./social-login.component.html",
	styleUrls: ["./social-login.component.scss"]
})
export class SocialLoginComponent implements OnInit {
	@Output() warning: EventEmitter<string>;

	public facebookLoginText: string;
	public googleLoginText: string;
	private warningText: string;
	public facebookLoginUrl: string;
	public googleLoginUrl: string;
	public feideLoginUrl: string;
	public providers: LoginModuleSettings["providers"];

	constructor(private _socailLoginService: SocialLoginService) {
		this.facebookLoginText = "Login with Facebook";
		this.googleLoginText = "Login with Google";
		this.warningText = "an error happened while trying to login";
		this.facebookLoginUrl = LOGIN_MODULE_SETTINGS.apiPath + "auth/facebook";
		this.googleLoginUrl = LOGIN_MODULE_SETTINGS.apiPath + "auth/google";
		this.feideLoginUrl = LOGIN_MODULE_SETTINGS.apiPath + "auth/feide";
		this.warning = new EventEmitter();
		this.providers = LOGIN_MODULE_SETTINGS.providers;
	}

	ngOnInit() {}

	onFacebookLogin() {
		this._socailLoginService
			.facebookLogin()
			.then(() => {
				console.log("facebook logged in!");
			})
			.catch((blApiErr: BlApiError) => {
				this.warning.emit(this.warningText);
			});
	}

	onGoogleLogin() {
		this._socailLoginService
			.googleLogin()
			.then(() => {
				console.log("google logged in!");
			})
			.catch((blApiErr: BlApiError) => {
				this.warning.emit(this.warningText);
			});
	}
}
