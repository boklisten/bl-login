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
import { LocalLoginComponent } from './local-login/local-login.component';
import {FormsModule} from "@angular/forms";
import { SocialLoginComponent } from './social-login/social-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LocalRegisterComponent } from '../register/local-register/local-register.component';
import { SocialRegisterComponent } from '../register/social-register/social-register.component';
import {LocalRegisterService} from "../register/local-register/local-register.service";
import {LoginRoutingModule} from "./login-routing.module";
import {RegisterModule} from "../register/register.module";
import { LoginMenuComponent } from './login-menu/login-menu.component';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import {BlConnectModule} from 'bl-connect';
import {SocialLoginService} from "./social-login/social-login.service";


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RegisterModule,
		NgbModule.forRoot(),
		LoginRoutingModule,
		BlConnectModule
	],
	providers: [
		LoginService,
		LocalLoginService,
		LocalRegisterService,
		SocialLoginService
	],
	declarations: [
		LoginComponent,
		LocalLoginComponent,
		SocialLoginComponent,
		ForgotPasswordComponent,
		LoginMenuComponent,
		LoginAuthComponent
	],
	exports: [
		LoginComponent
	]
})
export class LoginModule {
	withConfig(config?: {loginSuccessPath?: string}) {
	
	}
}
