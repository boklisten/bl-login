import {Component, OnInit} from '@angular/core';
import {APP_CONFIG} from "../../app_config";

@Component({
	selector: 'bl-social-register',
	templateUrl: './social-register.component.html',
	styleUrls: ['./social-register.component.scss']
})
export class SocialRegisterComponent implements OnInit {
	public registerFacebookText: string;
	public registerFacebookUrl: string;
	public registerGoogleUrl: string;
	public registerGoogleText: string;
	
	constructor() {
		this.registerFacebookText = 'Register with Facebook';
		this.registerGoogleText = 'Register with Google';
		this.registerFacebookUrl = APP_CONFIG.url.base + '/auth/facebook/register';
		this.registerGoogleUrl = APP_CONFIG.url.base + '/auth/google/register';
	}
	
	ngOnInit() {
	}
	
}
