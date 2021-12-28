// Gets the currently deployed URL.
export const getURL = (): string => {
	const url =
		// DEPLOY_MAIN_URL has been set to app.reacher.email for production only.
		process?.env?.DEPLOY_MAIN_URL && process.env.DEPLOY_MAIN_URL !== ''
			? process.env.DEPLOY_MAIN_URL
			: process?.env?.URL && process.env.URL !== ''
			? process.env.URL
			: process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ''
			? process.env.VERCEL_URL
			: 'http://localhost:3000';

	return url.includes('http') ? url : `https://${url}`;
};
