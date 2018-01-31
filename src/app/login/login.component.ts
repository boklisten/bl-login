import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalLoginService} from "./local-login/local-login.service";

@Component({
	selector: 'bl-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public showLogin: boolean;
	public showRegister: boolean;
	public showForgotPassword: boolean;
	
	constructor() {
		this.showLogin = false;
		this.showRegister = false;
		this.showForgotPassword = true;
	}
	
	
	ngOnInit() {
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
