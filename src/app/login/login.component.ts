import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalLoginService} from "./local-login/local-login.service";

@Component({
	selector: 'bl-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	
	constructor() {
	}
	
	
	ngOnInit() {
	}
	
	
}
