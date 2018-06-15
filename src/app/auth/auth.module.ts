import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthTokenComponent} from './auth-token/auth-token.component';
import { AuthSocialFailureComponent } from './auth-social-failure/auth-social-failure.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {AuthPasswordResetComponent} from "./auth-password-reset/auth-password-reset.component";
import {FormsModule} from "@angular/forms";

@NgModule({
	imports: [
		CommonModule,
		FontAwesomeModule,
		NgbAlertModule,
		FormsModule
	],
	declarations: [
		AuthTokenComponent,
		AuthSocialFailureComponent,
		AuthPasswordResetComponent
	],
	exports: [AuthTokenComponent]
})
export class AuthModule {
}
