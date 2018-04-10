import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginService} from "./login.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LocalLoginService} from "./local-login/local-login.service";
import { LocalLoginComponent } from './local-login/local-login.component';
import {FormsModule} from "@angular/forms";
import { SocialLoginComponent } from './social-login/social-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {LocalRegisterService} from "../register/local-register/local-register.service";
import {LoginRoutingModule} from "./login-routing.module";
import {RegisterModule} from "../register/register.module";
import { LoginMenuComponent } from './login-menu/login-menu.component';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import {BlConnectModule} from '@wizardcoder/bl-connect';
import {SocialLoginService} from "./social-login/social-login.service";
import { LoginSuccessComponent } from './login-success/login-success.component';
import {LOGIN_MODULE_SETTINGS} from "./login-module-settings";
import {AuthModule} from "../auth/auth.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faGraduationCap, faPhone} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";

library.add(faGraduationCap, faPhone);


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RegisterModule,
		NgbModule.forRoot(),
		LoginRoutingModule,
		BlConnectModule,
		AuthModule,
		FontAwesomeModule
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
		LoginAuthComponent,
		LoginSuccessComponent
	],
	exports: [
		LoginComponent
	]
})
export class LoginModule {
	public static withConfig(config?: {successPath?: string, userAgreementUrl?: string}) {
		if (config) {
			if (config.successPath) {
				LOGIN_MODULE_SETTINGS.successPath = config.successPath;
			}
			
			if (config.userAgreementUrl) {
				LOGIN_MODULE_SETTINGS.userAgreementUrl = config.userAgreementUrl;
			}
		}
		return this;
	}
}
