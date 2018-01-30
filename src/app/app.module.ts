import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginModule} from "./login/login.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		LoginModule
	],
	providers: [
		HttpClient
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
