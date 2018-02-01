import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'bl-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	
	
	public orUseEmailRegisterText: string;
	public navigationTitle: string;
	
	constructor(private _router: Router, private _route: ActivatedRoute) {
		this.orUseEmailRegisterText = 'or use your email to register';
		this.navigationTitle = 'Register';
	}
	
	ngOnInit() {
	}
	
	public onNavigateBack() {
		this._router.navigate(['../menu'], {relativeTo: this._route});
	}
	
}
