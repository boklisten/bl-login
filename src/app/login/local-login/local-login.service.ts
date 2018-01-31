import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "angular-2-local-storage";
import {TokenService} from "../../token/token.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {StorageService} from "../../storage/storage.service";

@Injectable()
export class LocalLoginService {
	private loginUrl: string;
	
	constructor(private _httpClient: HttpClient, private _storageService: StorageService, private _tokenService: TokenService) {
		this.loginUrl = 'http://localhost:1337/api/v1/auth/local/login';
	}
	
	public login(email: string, password: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (!email || email.length <= 0) {
				reject(new Error('email is empty or undefined'));
			}
			
			if (!password || password.length <= 0) {
				reject(new Error('password is empty or undefined'));
			}
			
			const loginObj = {
				username: email,
				password: password
			};
			
			this._httpClient.post(this.loginUrl, loginObj).toPromise().then((response: {data: any}) => {
				console.log('the tokens!', response.data);
				// this._localStorage.add('accessToken', )
				
				try {
					const validatedTokens = this.validateTokens(response.data);
					this.storeTokens(validatedTokens.accessToken, validatedTokens.refreshToken);
					this._tokenService.isAccessTokenValid();
				} catch (err) {
					return reject(new Error('could not validate the tokens: ' + err));
				}
				
				
				console.log(this._tokenService.decodeAccessToken());
				
				console.log('the accessToken was stored "' + this._storageService.getAccessToken());
				console.log('the refreshToken was stored "' + this._storageService.getRefreshToken());
				
				resolve(true);
			}).catch((err) => {
				reject(new Error('could not login: ' + err));
			});
		
			
			
		});
		
		
	}
	
	private validateTokens(data: any[]): {accessToken: string, refreshToken: string} {
		let refreshToken = '';
		let accessToken = '';
		
		for (const d of data) {
			if (!d.data || d.data.length <= 0) {
				throw new Error('data of refreshToken is not defined');
			}
			
			if (!d.documentName) {
				throw new Error('documentName is missing on return data');
			}
		
			if (d.documentName === 'refreshToken') {
				refreshToken = d.data;
			} else if (d.documentName === 'accessToken') {
				accessToken = d.data;
			}
		}
		
		if (!accessToken || accessToken.length <= 0 || !refreshToken || refreshToken.length <= 0) {
			throw new Error('tokens or one of the tokens are not defined');
		}
		
		return {accessToken: accessToken, refreshToken: refreshToken};
	}
	
	private storeTokens(accessToken: string, refreshToken: string): boolean {
		if (!accessToken || accessToken.length <= 0) {
			throw new Error('access token empty or undefined');
		}
		
		if (!refreshToken || refreshToken.length <= 0) {
			throw new Error('refresh token empty or undefined');
		}
		
		this._storageService.store(accessToken, refreshToken);
		
		return true;
	}
	
}
