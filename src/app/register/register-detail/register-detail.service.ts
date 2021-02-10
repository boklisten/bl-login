import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AccessToken, BlApiError, UserDetail } from "@boklisten/bl-model";
import { APP_CONFIG } from "../../app_config";
import { TokenService, UserDetailService } from "@boklisten/bl-connect";

@Injectable()
export class RegisterDetailService {
	private _userDetailUrl: string;

	constructor(
		private _userDetailService: UserDetailService,
		private _tokenService: TokenService
	) {
		this._userDetailUrl = APP_CONFIG.url.base + "/userdetails/";
	}

	public getUserDetails(): Promise<UserDetail> {
		return new Promise((resolve, reject) => {
			this._userDetailService
				.getById(this._tokenService.getAccessTokenBody().details)
				.then((userDetail: UserDetail) => {
					resolve(userDetail);
				})
				.catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
		});
	}

	public updateDetails(data: any): Promise<UserDetail> {
		return new Promise((resolve, reject) => {
			this._userDetailService
				.update(this._tokenService.getAccessTokenBody().details, data)
				.then((userDetail: UserDetail) => {
					resolve(userDetail);
				})
				.catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
		});
	}
}
