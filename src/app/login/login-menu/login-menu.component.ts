import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StorageService } from "@boklisten/bl-connect";

@Component({
	selector: "bl-login-menu",
	templateUrl: "./login-menu.component.html",
	styleUrls: ["./login-menu.component.scss"],
})
export class LoginMenuComponent implements OnInit {
	public registerButtonText: string;
	public loginButtonText: string;
	private redirect: string;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _storageService: StorageService
	) {
		this.registerButtonText = "Register new user";
		this.loginButtonText = "Login";
	}

	ngOnInit() {
		this.redirect = this._route.snapshot.queryParamMap.get("redirect");
		if (this.redirect) {
			this._storageService.add("bl-redirect", this.redirect);
		}
	}

	public onLogin() {
		this._router.navigate(["../login"], {
			relativeTo: this._route,
		});
	}

	public onRegister() {
		this._router.navigate(["../register"], {
			relativeTo: this._route,
		});
	}
}
