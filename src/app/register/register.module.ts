import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegisterDetailComponent} from './register-detail/register-detail.component';
import {RegisterComponent} from './register.component';
import {SocialRegisterComponent} from "./social-register/social-register.component";
import {LocalRegisterComponent} from "./local-register/local-register.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgbModule.forRoot()
	],
	declarations: [
		RegisterDetailComponent,
		RegisterComponent,
		SocialRegisterComponent,
		LocalRegisterComponent
	],
	exports: [
		RegisterComponent,
		RegisterDetailComponent
	]
})
export class RegisterModule {
}
