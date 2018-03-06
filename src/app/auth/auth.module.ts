import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthTokenComponent} from './auth-token/auth-token.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [AuthTokenComponent],
	exports: [AuthTokenComponent]
})
export class AuthModule {
}
