export type CmuAuthConfig = {
	oauthTokenUrl: string;
	oauthBasicInfoUrl: string;
	redirectUrl: string;
	clientId: string;
	clientSecret: string;
	jwtSecret: string;
	cookieDomain?: string;
};
