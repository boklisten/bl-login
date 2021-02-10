import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LoginModule } from "./login/login.module";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AuthLoginService } from "./login/auth-login.service";
import { UserDetailEditComponent } from "./user-detail/user-detail-edit/user-detail-edit.component";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
	declarations: [AppComponent],
	imports: [
		HttpClientModule,
		BrowserModule,
		LoginModule,
		AppRoutingModule,
		FontAwesomeModule,
	],
	providers: [AuthLoginService],
	bootstrap: [AppComponent],
})
export class AppModule {}
