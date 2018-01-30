import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LocalLoginService {
	private loginUrl: string;
	
	constructor(private _httpClient: HttpClient) {
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
			
			this._httpClient.post(this.loginUrl, loginObj).toPromise().then((tokens: any) => {
				console.log('the tokens!', tokens);
				resolve(true);
			}).catch((err) => {
				reject(new Error('could not login'));
			});
		
			
			
			
			
			
		});
		
		
	}
	
}
