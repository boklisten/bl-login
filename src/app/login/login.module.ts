import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginService} from "./login.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LocalLoginService} from "./local-login/local-login.service";
import {LocalStorageModule, LocalStorageService} from "angular-2-local-storage";
import {CookieModule} from 'ngx-cookie';
import {JwtModule} from '@auth0/angular-jwt';
import {TokenService} from "../token/token.service";
import {StorageService} from "../storage/storage.service";
import { LocalLoginComponent } from './local-login/local-login.component';
import {FormsModule} from "@angular/forms";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgbModule.forRoot(),
		LocalStorageModule.withConfig({
			prefix: 'bl',
			storageType: "localStorage"
		}),
		CookieModule.forChild(),
		JwtModule.forRoot({
			config: {
				whitelistedDomains: ['localhost:1337'],
				tokenGetter: () => {
					return localStorage.getItem('bl.access_token');
				}
			}
		})
	],
	providers: [
		LoginService,
		LocalLoginService,
		TokenService,
		StorageService
	],
	declarations: [
		LoginComponent,
		LocalLoginComponent
	],
	exports: [
		LoginComponent
	]
})
export class LoginModule {
}
