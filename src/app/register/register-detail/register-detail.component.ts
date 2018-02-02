import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
	
	
	public registerForm: FormGroup;
	
	constructor(@Inject(FormBuilder) fb: FormBuilder) {
		
		this.registerForm = fb.group({
			fullName: '',
			mobile: '',
			address: '',
			postCity: '',
			postCode: '',
			birtday: ''
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
	}
	
}
