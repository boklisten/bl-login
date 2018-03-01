import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalLoginService} from "./local-login/local-login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BlApiError} from "bl-model";


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
	
	constructor(private _router: Router, private _route: ActivatedRoute) {
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
		// this._router.navigate(['login'], {relativeTo: this._route});
	}
	
	public showNavigation() {
		return (this._router.url.indexOf('menu') < 0);
	}
	
	onShowLogin() {
		this.showRegister = false;
		this.showLogin = true;
		this.showForgotPassword = false;
	}
	
	onShowRegister() {
		this.showRegister = true;
		this.showLogin = false;
		this.showForgotPassword = false;
	}
	
	onShowForgotPassword() {
		this.showRegister = false;
		this.showLogin = false;
		this.showForgotPassword = true;
	}
	
	onShowMenu() {
		this.showRegister = false;
		this.showLogin = false;
		this.showForgotPassword = false;
	}
	
	showMenu(): boolean {
		return (!this.showLogin && !this.showRegister && !this.showForgotPassword);
	}
	
	
}
