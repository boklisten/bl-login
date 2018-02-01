import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'bl-login-auth',
	templateUrl: './login-auth.component.html',
	styleUrls: ['./login-auth.component.scss']
})
export class LoginAuthComponent implements OnInit {
	public orUseEmailText: string;
	public forgotPasswordButtonText: string;
	
	constructor() {
		this.orUseEmailText = 'or use your email to login';
		this.forgotPasswordButtonText = 'forgot password?';
	}
	
	ngOnInit() {
	}
	
	onForgotPassword() {
	
	}
	
}
