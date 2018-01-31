import {Component, OnInit} from '@angular/core';
import * as EmailValidator from 'email-validator';

@Component({
	selector: 'bl-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	public warning: boolean;
	public warningText: string;
	public email: string;
	public success: boolean;
	public successText: string;
	public forgotPasswordText: string;
	public tooltipText: string;
	
	constructor() {
		this.warning = false;
		this.warningText = '';
		this.email = '';
		this.success = false;
		this.successText = '';
		this.tooltipText = 'Email';
		this.forgotPasswordText = 'Write in your email and we will send you a link about how to reset it';
	}
	
	ngOnInit() {
	}
	
	public onRequestNewPassword() {
		this.setSuccess('email with instructions sent to you! (not true)');
	
	}
	
	public showRequestNewPasswordButton(): boolean {
		return (EmailValidator.validate(this.email));
	}
	
	private setWarning(msg: string) {
		this.warning = true;
		this.warningText = msg;
	}
	
	private setSuccess(msg: string) {
		this.success = true;
		this.successText = msg;
	}
	
	public clearWarning() {
		this.warning = false;
		this.warningText = '';
	}
	
	public clearSuccess() {
		this.success = false;
		this.successText = '';
	}
	
}
