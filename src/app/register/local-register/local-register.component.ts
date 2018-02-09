import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalRegisterService} from "./local-register.service";
import * as EmailValidator from 'email-validator';

@Component({
	selector: 'bl-local-register',
	templateUrl: './local-register.component.html',
	styleUrls: ['./local-register.component.scss']
})
export class LocalRegisterComponent implements OnInit {
	
	@Input() agreementConfirmed: boolean;
	@Output() registerWithoutAgreement: EventEmitter<boolean> = new EventEmitter();
	@Output() registered: EventEmitter<boolean> = new EventEmitter();
	
	public email: string;
	public password: string;
	
	public tooltipEmail: string;
	public tooltipPassword: string;
	
	public placeholderEmail: string;
	public placeholderPassword: string;
	
	public warning: boolean;
	public warningText: string;
	
	public registerButtonText: string;
	
	public passwordToShort: string;
	public emailNotValid: string;
	
	
	constructor(private _localRegisterService: LocalRegisterService) {
		this.email = '';
		this.password = '';
		this.tooltipEmail = 'Email';
		this.tooltipPassword = 'Password';
		this.placeholderEmail = 'Email';
		this.placeholderPassword = 'Password';
		this.warning = false;
		this.warningText = '';
		this.registerButtonText = 'Register';
		
		this.passwordToShort = 'Password is to short, needs to be at least 6 characters';
		this.emailNotValid = 'Email is not valid';
		
	}
	
	ngOnInit() {
	
	}
	
	public onRegister() {
		this.clearWarning();
		
		if (!EmailValidator.validate(this.email)) {
			this.setWarning(this.emailNotValid);
			return;
		}
		
		if (this.password.length < 6) {
			this.setWarning(this.passwordToShort);
			return;
		}
		
		if (!this.agreementConfirmed) {
			this.registerWithoutAgreement.emit(true);
			return;
		}
		
		
		this._localRegisterService.register(this.email, this.password).then(() => {
			this.registered.emit(true);
			
			
		}).catch((err) => {
			this.setWarning('Could not register');
			console.log('register error', err);
		});
	}
	
	public showRegisterButton() {
		return (EmailValidator.validate(this.email) && this.password.length > 0);
	}
	
	private setWarning(msg: string) {
		this.warning = true;
		this.warningText = msg;
	}
	
	public clearWarning() {
		this.warningText = '';
		this.warning = false;
	}
	
}
