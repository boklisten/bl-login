import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalLoginService} from "../../login/local-login/local-login.service";
import {RegisterDetailService} from "./register-detail.service";
import {BlApiError, UserDetail} from "bl-model";
import {LoginService} from "../../login/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LOGIN_MODULE_SETTINGS} from "../../login/login-module-settings";

@Component({
	selector: 'bl-register-detail',
	templateUrl: './register-detail.component.html',
	styleUrls: ['./register-detail.component.scss']
})
export class RegisterDetailComponent implements OnInit {
	public registerDetailTitle: string;
	public successMsg: string;
	public warningMsg: string;
	
	
	public username: string;
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
	private _userDetail: UserDetail;
	
	
	public registerForm: FormGroup;
	
	constructor(@Inject(FormBuilder) fb: FormBuilder, private _localLoginService: LocalLoginService,
				private _registerDetailService: RegisterDetailService, private _LoginService: LoginService,
				private _router: Router, private _route: ActivatedRoute) {
		
		
		this._defaultGroup = {
			name: '',
			phone: '',
			address: '',
			postCity: '',
			postCode: '',
			birthday: ''
		};
		
		this.registerForm = fb.group(this._defaultGroup);
		
		
		this.registerForm.valueChanges.subscribe((something) => {
			console.log('the change', something);
		});
		
		
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
		if (!this._LoginService.isLoggedIn()) {
			this._router.navigate(['../../menu'], {relativeTo: this._route});
		}
		
		this.fetchUserDetails();
	}
	
	private fetchUserDetails() {
		this._registerDetailService.getUserDetails().then((userDetail: UserDetail) => {
			this.setUserDetail(userDetail);
		}).catch((err: BlApiError) => {
			this._router.navigate(['../../menu'], {relativeTo: this._route});
		});
	}
	
	private setUserDetail(userDetail: UserDetail) {
		this.registerForm.reset();
		this._userDetail = userDetail;
		this._defaultGroup.name = (userDetail.name) ? userDetail.name : '';
		this._defaultGroup.phone = (userDetail.phone) ? userDetail.phone : '';
		this._defaultGroup.address = (userDetail.address) ? userDetail.address : '';
		this._defaultGroup.postCity = (userDetail.postCity) ? userDetail.postCity : '';
		this._defaultGroup.postCode = (userDetail.postCode) ? userDetail.postCode : '';
		this.registerForm.setValue(this._defaultGroup);
		this.username = userDetail.email;
	}
	
	public onUpdateDetails() {
		if (!this.registerForm.dirty) {
			console.log('no change detected, returning');
			return;
		}
		this._registerDetailService.updateDetails(this.registerForm.value).then((userDetail: UserDetail) => {
			this.setUserDetail(userDetail);
			this.setSuccess('user details was saved');
		}).catch((blApiErr: BlApiError) => {
			console.log('got error from server when updating the userDetail: ', blApiErr);
		});
	}
	
	private isUserDetailChanged() {
		if (JSON.stringify(this._defaultGroup) === JSON.stringify(this.registerForm.value)) {
			return false;
		}
		
		return true;
	}
	
	private setSuccess(msg: string) {
		this.successMsg = msg;
		
		setTimeout(() => {
			this.successMsg = null;
		}, 3000);
	}
	
	public onRegisterDetailLater() {
		this._router.navigateByUrl(LOGIN_MODULE_SETTINGS.successPath);
	}
}
