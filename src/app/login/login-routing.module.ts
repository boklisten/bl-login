import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "../register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginMenuComponent } from "./login-menu/login-menu.component";
import { LoginAuthComponent } from "./login-auth/login-auth.component";
import { RegisterDetailComponent } from "../register/register-detail/register-detail.component";
import { LoginSuccessComponent } from "./login-success/login-success.component";
import { AuthTokenComponent } from "../auth/auth-token/auth-token.component";
import { LoginPermissionFailureComponent } from "./login-permission-failure/login-permission-failure.component";
import { LogoutComponent } from "./logout/logout.component";
import { AuthSocialFailureComponent } from "../auth/auth-social-failure/auth-social-failure.component";
import { AuthPasswordResetComponent } from "../auth/auth-password-reset/auth-password-reset.component";
import { AuthEmailValidationComponent } from "../auth/auth-email-validation/auth-email-validation.component";
import { UserDetailEditComponent } from "../user-detail/user-detail-edit/user-detail-edit.component";

const routes: Routes = [
	{
		path: "auth",
		component: LoginComponent,
		children: [
			{
				path: "menu",
				component: LoginMenuComponent
			},
			{
				path: "login",
				component: LoginAuthComponent
			},
			{
				path: "login/forgot",
				component: ForgotPasswordComponent
			},
			{
				path: "reset/:id",
				component: AuthPasswordResetComponent
			},
			{
				path: "email/confirm/:id",
				component: AuthEmailValidationComponent
			},
			{
				path: "social/failure",
				component: AuthSocialFailureComponent
			},
			{
				path: "success",
				component: LoginSuccessComponent
			},
			{
				path: "register",
				component: RegisterComponent
			},
			{
				path: "register/detail",
				component: RegisterDetailComponent
			},
			{
				path: "token",
				component: AuthTokenComponent
			},
			{
				path: "permission/denied",
				component: LoginPermissionFailureComponent
			},
			{
				path: "logout",
				component: LogoutComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LoginRoutingModule {}
