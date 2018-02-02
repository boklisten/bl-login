import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalLoginService} from "../../login/local-login/local-login.service";
import {RegisterDetailService} from "./register-detail.service";
import {UserDetail} from "bl-model";

@Component({
	selector: 'bl-register-detail',
	templateUrl: './register-detail.component.html',
	styleUrls: ['./register-detail.component.scss']
})
export class RegisterDetailComponent implements OnInit {
	public registerDetailTitle: string;
	
	
	public fullName: string;
	public tooltipFullName: string;
	public tooltipMobile: string;
	public tooltipAddress: string;
	public tooltipPostCode: string;
	public tooltipPostCity: string;
	public tooltipBirthday: string;
	public tooltipBranch: string;
	public tooltipSelectBranch: string;
	public branches: any[];
	private _defaultGroup: any;
	
	
	public registerForm: FormGroup;
	
	constructor(@Inject(FormBuilder) fb: FormBuilder, private _localLoginService: LocalLoginService,
				private _registerDetailService: RegisterDetailService) {
		
		
		this._defaultGroup = {
			fullName: '',
			mobile: '',
			address: '',
			postCity: '',
			postCode: '',
			birtday: ''
		};
		
		this.registerForm = fb.group(this._defaultGroup);
		
		
		this.registerDetailTitle = 'Register your details';
		
		
		this.tooltipFullName = 'Full name';
		this.tooltipMobile = 'Mobile number';
		this.tooltipAddress = 'Address';
		this.tooltipPostCode = 'code';
		this.tooltipPostCity = 'city';
		this.tooltipBirthday = 'Birthday';
		this.tooltipBranch = 'Branch';
		this.tooltipSelectBranch = 'Select Branch';
		this.branches = [
			{id: '1', name: 'Akademiet Oslo'},
			{id: '2', name: 'Sonans Oslo'}
		];
		
	}
	
	
	ngOnInit() {
		this._localLoginService.login('a@b.com', 'password').then(() => {
			console.log('logged in!');
			this.fetchUserDetails();
		}).catch(() => {
			console.log('hi there');
		});
	}
	
	private fetchUserDetails() {
		this._registerDetailService.getUserDetails().then((userDetail: UserDetail) => {
				console.log('we got the user details!!', userDetail);
				this._defaultGroup.fullName = userDetail.name;
				console.log('the defaultValue is now', this._defaultGroup);
				this.registerForm.setValue(this._defaultGroup);
		}).catch((err) => {
			console.log('the error', err);
		});
	}
	
}
