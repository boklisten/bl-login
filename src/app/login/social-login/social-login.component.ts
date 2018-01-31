import {Component, OnInit} from '@angular/core';
import {APP_CONFIG} from "../../app_config";

@Component({
	selector: 'bl-social-login',
	templateUrl: './social-login.component.html',
	styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {
	public facebookLoginUrl: string;
	public googleLoginUrl: string;
	
	constructor() {
		this.facebookLoginUrl = APP_CONFIG.url.base + '/auth/facebook';
		this.googleLoginUrl = APP_CONFIG.url.base + '/auth/google';
	}
	
	ngOnInit() {
	}
	
}
