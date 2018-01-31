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
	
	constructor() {
		this.showLogin = true;
		this.showRegister = false;
	}
	
	
	ngOnInit() {
	}
	
	onShowLogin() {
		this.showRegister = false;
		this.showLogin = true;
	}
	
	onShowRegister() {
		this.showRegister = true;
		this.showLogin = false;
	}
	
	onShowMenu() {
		this.showRegister = false;
		this.showLogin = false;
	}
	
	showMenu(): boolean {
		return (!this.showLogin && !this.showRegister);
	}
	
	
}
