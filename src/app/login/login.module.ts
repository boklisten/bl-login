import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginService} from "./login.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LocalLoginService} from "./local-login/local-login.service";
import {LocalStorageModule} from "angular-2-local-storage";

@NgModule({
	imports: [
		CommonModule,
		NgbModule.forRoot(),
		LocalStorageModule.withConfig({
			prefix: 'bl',
			storageType: "localStorage"
		})
	],
	providers: [
		LoginService,
		LocalLoginService,
	],
	declarations: [LoginComponent],
	exports: [
		LoginComponent
	]
})
export class LoginModule {
}
