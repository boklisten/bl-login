import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "../register/register.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {LoginMenuComponent} from "./login-menu/login-menu.component";
import {LoginAuthComponent} from "./login-auth/login-auth.component";

const routes: Routes = [
	{
		path: 'auth',
		component: LoginComponent,
		children: [
			{
				path: 'menu',
				component: LoginMenuComponent
			},
			{
				path: 'login',
				component: LoginAuthComponent,
			},
			{
				path: 'login/forgot',
				component: ForgotPasswordComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LoginRoutingModule {
}
