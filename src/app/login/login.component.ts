import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
	selector: 'bl-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public showLogin: boolean;
	public showRegister: boolean;
	public showForgotPassword: boolean;
	public registerButtonText: string;
	public loginButtonText: string;
	public orUseEmailText: string;
	public forgotPasswordTitleText: string;
	public forgotPasswordButtonText: string;
	public loginTitle: string;
	public registerTitle: string;
	public orUseEmailRegisterText: string;
	public navigationTitle: string;
	
	constructor(private _router: Router) {
		this.showLogin = false;
		this.showRegister = false;
		this.showForgotPassword = false;
		
		this.navigationTitle = 'Login';
		
		this.registerButtonText = 'Register';
		this.loginButtonText = 'Login';
		this.loginTitle = 'Login';
		this.registerTitle = 'Register';
		this.forgotPasswordButtonText = 'forgot password';
		this.forgotPasswordTitleText = 'forgot password?';
		this.orUseEmailText = 'or use your email';
		this.orUseEmailRegisterText = 'or use your email and password';
	}
	
	
	ngOnInit() {
	}
	
	public showNavigation() {
		return (this._router.url.indexOf('menu') < 0);
	}
}
