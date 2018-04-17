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

import {library} from "@fortawesome/fontawesome-svg-core";

import {faSquare} from "@fortawesome/free-regular-svg-icons";

import {faPhone, faAt, faUser, faBirthdayCake, faCalendarAlt, faAddressCard,
	faGraduationCap, faCheckSquare, faKey, faChevronLeft, faExclamationTriangle,
	faUserPlus, faSignInAlt, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {faFacebookSquare} from "@fortawesome/free-brands-svg-icons/faFacebookSquare";
import {faGoogle} from "@fortawesome/free-brands-svg-icons/faGoogle";
import { LoginPermissionFailureComponent } from './login-permission-failure/login-permission-failure.component';


library.add(faPhone, faAt, faUser, faBirthdayCake, faCalendarAlt, faAddressCard, faGraduationCap, faSquare, faCheckSquare, faKey,
	faFacebookSquare, faGoogle, faChevronLeft, faExclamationTriangle, faUserPlus, faSignInAlt, faArrowRight);


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
		LoginSuccessComponent,
		LoginPermissionFailureComponent
	],
	exports: [
		LoginComponent
	]
})
export class LoginModule {
	public static withConfig(config?: {successPath?: string, userAgreementUrl?: string, apiPath?: string}) {
		if (config) {
			if (config.successPath) {
				LOGIN_MODULE_SETTINGS.successPath = config.successPath;
			}
			
			if (config.userAgreementUrl) {
				LOGIN_MODULE_SETTINGS.userAgreementUrl = config.userAgreementUrl;
			}
			
			if (config.apiPath) {
				LOGIN_MODULE_SETTINGS.apiPath = config.apiPath;
			}
		}
		return this;
	}
}
