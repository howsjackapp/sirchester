// Gets the currently deployed URL.
export function getURL(): string {
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
}

/**
 * Navigate to a new path, but also pass current query params.
 *
 * @param currentPath - The current path.
 * @param to - The URL to navigate to.
 */
export function passQueryParams(
	currentPath: string,
	to: string,
	addQueryParams?: [string, string][],
	removeQueryParams?: string[]
): string {
	const u = new URL(currentPath, getURL());
	addQueryParams?.forEach(([k, v]) => {
		u.searchParams.set(k, v);
	});
	removeQueryParams?.forEach((k) => u.searchParams.delete(k));

	return `${to}${u.search}`;
}
