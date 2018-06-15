import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthTokenComponent} from './auth-token/auth-token.component';
import { AuthSocialFailureComponent } from './auth-social-failure/auth-social-failure.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
	imports: [
		CommonModule,
		FontAwesomeModule,
		NgbAlertModule
	],
	declarations: [AuthTokenComponent, AuthSocialFailureComponent],
	exports: [AuthTokenComponent]
})
export class AuthModule {
}
