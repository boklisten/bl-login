import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TokenService} from "bl-connect";

@Component({
	selector: 'bl-auth-token',
	templateUrl: './auth-token.component.html',
	styleUrls: ['./auth-token.component.scss']
})
export class AuthTokenComponent implements OnInit {
	
	constructor(private _router: Router, private _route: ActivatedRoute, private _tokenService: TokenService) {
	}
	
	ngOnInit() {
		this._route.paramMap.subscribe((paramMap: ParamMap) => {
			this._tokenService.addAccessToken(paramMap.get('accessToken'));
			this._tokenService.addRefreshToken('refreshToken');
			this._router.navigateByUrl('auth/register/detail');
		});
	}
}
