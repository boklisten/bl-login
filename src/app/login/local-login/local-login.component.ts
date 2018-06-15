import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalLoginService} from "./local-login.service";
import * as EmailValidator from 'email-validator';
import {BlApiError, BlApiLoginRequiredError, BlApiPermissionDeniedError} from "@wizardcoder/bl-model";

@Component({
	selector: 'bl-local-login',
	templateUrl: './local-login.component.html',
	styleUrls: ['./local-login.component.scss']
})
export class LocalLoginComponent implements OnInit {
	public email: string;
	public password: string;
	public warning: boolean;
	public warningText: string;
	public tooltipEmail: string;
	public tooltipPassword: string;
	public loginButtonText: string;

	public loginError: boolean;
	public connectionError: boolean;

	@Output() loggedIn: EventEmitter<boolean>;

	constructor(private _localLoginService: LocalLoginService) {
		this.email = '';
		this.password = '';
		this.warning = false;
		this.warningText = '';
		this.tooltipEmail = 'Email';
		this.tooltipPassword = 'Password';
		this.loginButtonText = 'Login';
		this.loggedIn = new EventEmitter<boolean>();
		this.loginError = false;
		this.connectionError = false;
	}

	ngOnInit() {
	}

	public login() {
		this.clearWarning();
		if (!this.showLoginButton()) {
			this.setWarning('correct email and a password must be provided');
			return;
		}
		this.loginError = false;
		this.connectionError = false;

		this._localLoginService.login(this.email, this.password).then(() => {
			this.loggedIn.emit(true);
		}).catch((blApiErr: BlApiError) => {
			if (blApiErr instanceof BlApiLoginRequiredError || blApiErr instanceof BlApiPermissionDeniedError) {
				this.loginError = true;
			} else {
				this.connectionError = true;
			}
		});
	}

	private setWarning(msg: string) {
		this.warning = true;
		this.warningText = msg;
	}

	public clearWarning() {
		this.warningText = '';
		this.warning = false;
	}

	public showLoginButton() {
		return (this.password.length > 0 && EmailValidator.validate(this.email));
	}

}
