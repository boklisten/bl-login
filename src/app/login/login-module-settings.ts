export interface LoginModuleSettings {
	successPath: string;
	userAgreementUrl: string;
	registerSuccessPath: string;
	userDetailNotValidPath: string;
	apiPath: string;
	logoutPath: string;
	permissionDeniedPath: string;
	permissions: string[];
}

export let LOGIN_MODULE_SETTINGS: LoginModuleSettings = {
	successPath: "/auth/success",
	registerSuccessPath: "/auth/success",
	userDetailNotValidPath: "/auth/register/detail",
	userAgreementUrl: "/useragreement",
	apiPath: "http://localhost:1337/",
	logoutPath: "/auth/menu",
	permissionDeniedPath: "/auth/permission/denied",
	permissions: ["customer", "employee", "admin"]
};
