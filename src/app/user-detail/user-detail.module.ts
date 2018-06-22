import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserDetailEditComponent} from "./user-detail-edit/user-detail-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbDateAdapter, NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbDateNativeAdapter} from "../register/register-detail/register-detail.component";
import { UserDetailDobComponent } from './user-detail-dob/user-detail-dob.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		NgbDatepickerModule
	],
	declarations: [
		UserDetailEditComponent,
		UserDetailDobComponent
	],
	exports: [
		UserDetailEditComponent
	],
	providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class UserDetailModule {
}
