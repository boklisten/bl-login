import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmailValidationService, TokenService} from "@wizardcoder/bl-connect";
import {BlApiError} from "@wizardcoder/bl-model";
import {LOGIN_MODULE_SETTINGS} from "../../login/login-module-settings";

@Component({
	selector: 'bl-auth-email-validation',
	templateUrl: './auth-email-validation.component.html',
	styleUrls: ['./auth-email-validation.component.scss']
})
export class AuthEmailValidationComponent implements OnInit {
	private _id: string;

	public emailConfirmed: boolean;
	public emailValidationError: boolean;
	public newLinkSent: boolean;
	public waiting: boolean;

	constructor(private _router: Router,
				private _route: ActivatedRoute,
				private _emailValidationService: EmailValidationService,
				private _tokenService: TokenService) {
		this.emailConfirmed = false;
		this.emailValidationError = false;
		this.newLinkSent = false;
	}

	ngOnInit() {
		this._id = this._route.snapshot.paramMap.get('id');
		this.waiting = true;

		this._emailValidationService.validateConfirmationLink(this._id).then(() => {
			this.emailConfirmed = true;
			this.waiting = false;
			this.goToHome();
		}).catch(() => {
			this.waiting = false;
			this.emailValidationError = true;
		});
	}

	goToHome() {
		this._router.navigateByUrl(LOGIN_MODULE_SETTINGS.successPath);
	}

	isLoggedIn() {
		return this._tokenService.haveAccessToken();
	}

	goToLogin() {
		this._router.navigate(['/auth/login']);
	}

	sendNewConfirmationLink() {
		this.emailValidationError = false;
		this.waiting = true;

		const userDetailId = this._tokenService.getAccessTokenBody().details;
		const email = this._tokenService.getAccessTokenBody().username;

		this._emailValidationService.requestNewConfirmationLink(userDetailId, email).then(() => {
			this.waiting = false;
			this.newLinkSent = true;

			setTimeout(() => {
				this.goToHome();
			}, 2500);

		}).catch((blApiError: BlApiError) => {

		});
	}

}
