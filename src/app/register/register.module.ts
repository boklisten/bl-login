import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegisterDetailComponent} from './register-detail/register-detail.component';
import {RegisterComponent} from './register.component';
import {SocialRegisterComponent} from "./social-register/social-register.component";
import {LocalRegisterComponent} from "./local-register/local-register.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterAgreementComponent } from './register-agreement/register-agreement.component';
import { UserAgreementModalComponent } from './user-agreement-modal/user-agreement-modal.component';
import {RegisterDetailService} from "./register-detail/register-detail.service";
import {SocialRegisterService} from "./social-register/social-register.service";
import {BlConnectModule} from "@boklisten/bl-connect";
import {LocalRegisterService} from "./local-register/local-register.service";
import {DateService} from "../date/date.service";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		NgbModule.forRoot(),
		BlConnectModule,
		FontAwesomeModule
	],
	providers: [
		RegisterDetailService,
		SocialRegisterService,
		LocalRegisterService,
		DateService
	],
	declarations: [
		RegisterDetailComponent,
		RegisterComponent,
		SocialRegisterComponent,
		LocalRegisterComponent,
		RegisterAgreementComponent,
		UserAgreementModalComponent
	],
	exports: [
		RegisterComponent,
		RegisterDetailComponent
	]
})
export class RegisterModule {
}
