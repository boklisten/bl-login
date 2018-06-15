import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
	selector: 'bl-auth-social-failure',
	templateUrl: './auth-social-failure.component.html',
	styleUrls: ['./auth-social-failure.component.scss']
})
export class AuthSocialFailureComponent implements OnInit {

	constructor(private _router: Router) {
	}

	ngOnInit() {
	}

	onGoBack() {
		this._router.navigate(['/auth/menu']);
	}

}
