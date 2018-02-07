import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {APP_CONFIG} from "../../app_config";
import {SocialRegisterService} from "./social-register.service";

@Component({
	selector: 'bl-social-register',
	templateUrl: './social-register.component.html',
	styleUrls: ['./social-register.component.scss']
})
export class SocialRegisterComponent implements OnInit {
	
	@Output() warning: EventEmitter<string> = new EventEmitter();
	@Input() agreementConfirmed: boolean;
	
	public registerFacebookText: string;
	public registerFacebookUrl: string;
	public registerGoogleUrl: string;
	public registerGoogleText: string;
	public agreementNotConfirmedText: string;
	
	constructor(private _socialRegisterService: SocialRegisterService) {
		this.registerFacebookText = 'Register with Facebook';
		this.registerGoogleText = 'Register with Google';
		this.registerFacebookUrl = APP_CONFIG.url.base + '/auth/facebook/register';
		this.registerGoogleUrl = APP_CONFIG.url.base + '/auth/google/register';
		this.agreementNotConfirmedText = 'You must agree to the user agreement before registering';
	}
	
	ngOnInit() {
	}
	
	public onSelectFacebook() {
		if (!this.agreementConfirmed) {
			this.warning.emit(this.agreementNotConfirmedText);
		} else {
			this._socialRegisterService.register("facebook");
		}
	}
	
	public onSelectGoogle() {
		if (!this.agreementConfirmed) {
			this.warning.emit(this.agreementNotConfirmedText);
		} else {
			this._socialRegisterService.register("google");
		}
	}
	
}
