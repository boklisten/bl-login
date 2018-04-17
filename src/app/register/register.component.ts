import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthLoginService} from "../login/auth-login.service";

@Component({
	selector: 'bl-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	
	
	public orUseEmailRegisterText: string;
	public navigationTitle: string;
	public useSocialRegisterText: string;
	public agreementConfirmed: boolean;
	private _agreementNotConfirmedText: string;
	
	public warning: boolean;
	public warningText: string;
	
	constructor(private _router: Router, private _route: ActivatedRoute, private _authLoginService: AuthLoginService) {
		this.orUseEmailRegisterText = 'or use your email to register';
		this.useSocialRegisterText = 'use a social account to register';
		this.navigationTitle = 'Register';
		this.agreementConfirmed = false;
		this._agreementNotConfirmedText = 'You need to confirm the agreement to register';
		
		
	}
	
	ngOnInit() {
	}
	
	public onNavigateBack() {
		this._router.navigate(['../menu'], {relativeTo: this._route});
	}
	
	public onConfirmedAgreement(confirmed: boolean) {
		this.agreementConfirmed = true;
		this.clearWarning();
	}
	
	public onDismissedAgreement(dismissed: boolean) {
		this.agreementConfirmed = false;
		this.clearWarning();
	}
	
	public onRegistered() {
		this.clearWarning();
		this._authLoginService.login('auth/register/detail');
	}
	
	public onRegisterWithoutAgreement() {
		this.setWarning(this._agreementNotConfirmedText);
	}
	
	public setWarning(msg: string) {
		this.warning = true;
		this.warningText = msg;
	}
	
	public clearWarning() {
		this.warning = false;
		this.warningText = '';
	}
	
}
