import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'bl-login-menu',
	templateUrl: './login-menu.component.html',
	styleUrls: ['./login-menu.component.scss']
})
export class LoginMenuComponent implements OnInit {
	public registerButtonText: string;
	public loginButtonText: string;
	
	constructor(private _router: Router, private _route: ActivatedRoute) {
		this.registerButtonText = 'Register new user';
		this.loginButtonText = 'Login';
	}
	
	ngOnInit() {
	}
	
	public onLogin() {
		this._router.navigate(['/auth/login']);
	}
	
	public onRegister() {
		this._router.navigate(['/auth/register']);
	}
	
}
