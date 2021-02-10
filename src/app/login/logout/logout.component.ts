import { Component, OnInit } from "@angular/core";
import { AuthLoginService } from "../auth-login.service";
import { LOGIN_MODULE_SETTINGS } from "../login-module-settings";

@Component({
	selector: "bl-logout",
	templateUrl: "./logout.component.html",
	styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent implements OnInit {
	constructor(private _authLoginService: AuthLoginService) {}

	ngOnInit() {
		this._authLoginService.logout(LOGIN_MODULE_SETTINGS.logoutPath);
	}
}
