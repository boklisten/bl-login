import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {APP_CONFIG} from "../../app_config";
import {SocialLoginService} from "./social-login.service";
import {BlApiError} from "bl-model";

@Component({
	selector: 'bl-social-login',
	templateUrl: './social-login.component.html',
	styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {
	
	@Output() warning: EventEmitter<string>;
	
	public facebookLoginText: string;
	public googleLoginText: string;
	private warningText: string;
	
	constructor(private _socailLoginService: SocialLoginService) {
		this.facebookLoginText = 'Login with Facebook';
		this.googleLoginText = 'Login with Google';
		this.warningText = 'an error happened while trying to login';
		this.warning = new EventEmitter();
	}
	
	ngOnInit() {
	}
	
	
	onFacebookLogin() {
		this._socailLoginService.facebookLogin().then(() => {
			console.log('facebook logged in!');
		}).catch((blApiErr: BlApiError) => {
			this.warning.emit(this.warningText);
		});
	}
	
	onGoogleLogin() {
		this._socailLoginService.googleLogin().then(() => {
			console.log('google logged in!');
		}).catch((blApiErr: BlApiError) => {
			this.warning.emit(this.warningText);
		});
	}
	
}
