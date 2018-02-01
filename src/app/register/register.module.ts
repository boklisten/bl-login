import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegisterDetailComponent} from './register-detail/register-detail.component';
import {RegisterComponent} from './register.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [RegisterDetailComponent, RegisterComponent]
})
export class RegisterModule {
}
