import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordResetService} from "@boklisten/bl-connect";
import {BlApiError} from "@boklisten/bl-model";

@Component({
	selector: 'bl-auth-password-reset',
	templateUrl: './auth-password-reset.component.html',
	styleUrls: ['./auth-password-reset.component.scss']
})
export class AuthPasswordResetComponent implements OnInit {
	private id: string;
	public success: boolean;
	public warning: boolean;
	public password: string;
	public passwordNotValid: boolean;


	constructor(private _route: ActivatedRoute, private _router: Router, private _passwordResetService: PasswordResetService) {
		this.success = false;
		this.warning = false;
		this.passwordNotValid = false;
	}

	ngOnInit() {
		this.id = this._route.snapshot.paramMap.get('id');
	}

	public onSetNewPassword() {
		this.passwordNotValid = false;
		this.warning = false;
		this.success = false;

		if (!this.password || this.password.length < 6 || this.password.length > 50) {
			this.passwordNotValid = true;
			return;
		}

		this._passwordResetService.setNewPassword(this.password, this.id).then(() => {
			this.success = true;
		}).catch((blApiError: BlApiError) => {
			this.warning = true;
		});
	}

	public showSetNewPasswordButton() {
		return (this.password && (this.password.length >= 6 && this.password.length <= 50));
	}

	public onGoToLogin() {
		this._router.navigate(['/auth/login']);
	}

}
