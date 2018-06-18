import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {AuthLoginService} from "./auth-login.service";
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
import {LOGIN_MODULE_SETTINGS, LoginModuleSettings} from "./login-module-settings";
import {AuthModule} from "../auth/auth.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {library} from "@fortawesome/fontawesome-svg-core";

import {faSquare} from "@fortawesome/free-regular-svg-icons";

import {faPhone, faAt, faUser, faBirthdayCake, faCalendarAlt, faAddressCard,
	faGraduationCap, faCheckSquare, faKey, faChevronLeft, faExclamationTriangle,
	faUserPlus, faSignInAlt, faArrowRight, faTimes, faCheckCircle, faTimesCircle,
	faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {faFacebookSquare} from "@fortawesome/free-brands-svg-icons/faFacebookSquare";
import {faGoogle} from "@fortawesome/free-brands-svg-icons/faGoogle";
import { LoginPermissionFailureComponent } from './login-permission-failure/login-permission-failure.component';
import { LogoutComponent } from './logout/logout.component';


library.add(faPhone, faTimes, faAt, faUser, faBirthdayCake, faCalendarAlt, faAddressCard, faGraduationCap, faSquare, faCheckSquare, faKey,
	faFacebookSquare, faGoogle, faChevronLeft, faExclamationTriangle,
	faUserPlus, faSignInAlt, faArrowRight, faCheckCircle, faTimesCircle,
	faCircleNotch);


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
		LocalLoginService,
		LocalRegisterService,
		SocialLoginService,
		AuthLoginService
	],
	declarations: [
		LoginComponent,
		LocalLoginComponent,
		SocialLoginComponent,
		ForgotPasswordComponent,
		LoginMenuComponent,
		LoginAuthComponent,
		LoginSuccessComponent,
		LoginPermissionFailureComponent,
		LogoutComponent
	],
	exports: [
		LoginComponent
	]
})
export class LoginModule {
	public static withConfig(settings?: LoginModuleSettings) {
		if (settings) {
			if (settings.successPath) {
				LOGIN_MODULE_SETTINGS.successPath = settings.successPath;
			}

			if (settings.userAgreementUrl) {
				LOGIN_MODULE_SETTINGS.userAgreementUrl = settings.userAgreementUrl;
			}

			if (settings.apiPath) {
				LOGIN_MODULE_SETTINGS.apiPath = settings.apiPath;
			}

			if (settings.logoutPath) {
				LOGIN_MODULE_SETTINGS.logoutPath = settings.logoutPath;
			}

			if (settings.permissionDeniedPath) {
				LOGIN_MODULE_SETTINGS.permissionDeniedPath = settings.permissionDeniedPath;
			}

			if (settings.permissions) {
				LOGIN_MODULE_SETTINGS.permissions = settings.permissions;
			}
		}
		return this;
	}
}
