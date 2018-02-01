import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'bl-login-auth',
	templateUrl: './login-auth.component.html',
	styleUrls: ['./login-auth.component.scss']
})
export class LoginAuthComponent implements OnInit {
	public orUseEmailText: string;
	public forgotPasswordButtonText: string;
	public navigationTitle: string;
	
	constructor(private _router: Router, private _route: ActivatedRoute) {
		this.orUseEmailText = 'or use your email to login';
		this.forgotPasswordButtonText = 'forgot password?';
		this.navigationTitle = 'Login';
	}
	
	ngOnInit() {
	}
	
	onForgotPassword() {
		this._router.navigate(['./forgot'], {relativeTo: this._route});
	}
	
}