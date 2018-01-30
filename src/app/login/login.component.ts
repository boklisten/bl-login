import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalLoginService} from "./local-login/local-login.service";

@Component({
	selector: 'bl-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	
	constructor(private _localLogin: LocalLoginService) {
	}
	
	
	ngOnInit() {
		this._localLogin.login('bill@ofrights.com', 'billoriley').then((success) => {
			console.log('logged in!');
		}).catch((err) => {
			console.log('some error', err);
		});
		
	}
	
	
}
