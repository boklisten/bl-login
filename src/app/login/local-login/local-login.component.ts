import {Component, OnInit} from '@angular/core';
import {LocalLoginService} from "./local-login.service";
import * as EmailValidator from 'email-validator';
import {BlApiError, BlApiLoginRequiredError, BlApiPermissionDeniedError} from "bl-model";

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
	
	constructor(private _localLoginService: LocalLoginService) {
		this.email = '';
		this.password = '';
		this.warning = false;
		this.warningText = '';
		this.tooltipEmail = 'Email';
		this.tooltipPassword = 'Password';
		this.loginButtonText = 'Login';
	}
	
	ngOnInit() {
	}
	
	public login() {
		this.clearWarning();
		if (!this.showLoginButton()) {
			this.setWarning('correct email and a password must be provided');
			return;
		}
		
		this._localLoginService.login(this.email, this.password).then(() => {
			
			console.log('we are logged in!');
			
			
		}).catch((blApiErr: BlApiError) => {
			if (blApiErr instanceof BlApiPermissionDeniedError) {
				this.setWarning('Username or password is incorrect');
			} else {
				this.setWarning('There was a problem logging in');
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
