import { Component, OnInit } from "@angular/core";
import * as EmailValidator from "email-validator";
import { PasswordResetService } from "@boklisten/bl-connect";
import { BlApiError } from "@boklisten/bl-model";

@Component({
	selector: "bl-forgot-password",
	templateUrl: "./forgot-password.component.html",
	styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
	public warning: boolean;
	public warningText: string;
	public email: string;
	public success: boolean;
	public successText: string;
	public forgotPasswordText: string;
	public tooltipText: string;
	public navigationTitle: string;
	public emailNotValid: boolean;

	constructor(private _passwordResetService: PasswordResetService) {
		this.warning = false;
		this.warningText = "";
		this.email = "";
		this.success = false;
		this.successText = "";
		this.tooltipText = "Email";
		this.forgotPasswordText =
			"Write in your email and we will send you a link about how to reset it";
		this.navigationTitle = "Forgot password";
		this.emailNotValid = false;
	}

	ngOnInit() {}

	public onRequestNewPassword() {
		this.warning = false;
		this.success = false;
		this.emailNotValid = false;

		if (!EmailValidator.validate(this.email)) {
			this.emailNotValid = true;
			return;
		}

		this._passwordResetService
			.requestPasswordResetLink(this.email)
			.then(() => {
				this.success = true;
			})
			.catch((blApiError: BlApiError) => {
				this.warning = true;
			});
	}

	public showRequestNewPasswordButton(): boolean {
		return EmailValidator.validate(this.email);
	}
}
