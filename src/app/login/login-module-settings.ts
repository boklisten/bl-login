

export interface LoginModuleSettings {
	successPath: string;
	userAgreementUrl: string;
	registerSuccessPath: string;
	apiPath: string;
	logoutPath: string;
	permissionDeniedPath: string;
	permissions: string[];
}

export let LOGIN_MODULE_SETTINGS: LoginModuleSettings = {
	successPath: '/auth/success',
	registerSuccessPath: '/auth/success',
	userAgreementUrl: '/useragreement',
	apiPath: 'http://localhost:1337/api/v1/',
	logoutPath: '/auth/menu',
	permissionDeniedPath: '/auth/permission/denied',
	permissions: ['customer', 'employee', 'admin']
};
