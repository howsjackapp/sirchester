import httpProxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
): void {
	try {
		const url = decodeURIComponent(req.query.q as string);
		const parsed = new URL(url);

		const proxy = httpProxy.createProxyServer();

		// Fix URLs and query params forwarding.
		// https://stackoverflow.com/questions/55285448/node-http-proxy-how-to-pass-new-query-parameters-to-initial-request
		proxy.on('proxyReq', function (proxyReq) {
			proxyReq.path = parsed.toString();
		});

		proxy.on('proxyRes', (proxyRes) => {
			// Allow embedding in iframe.
			proxyRes.headers['X-Frame-Options'] = 'ALLOWALL';
		});

		// Avoid the following error:
		// "Error [ERR_TLS_CERT_ALTNAME_INVALID]: Hostname/IP does not match certificate's altnames"
		req.headers['host'] = parsed.host || undefined;

		proxy.web(req, res, { target: url }, (err) => {
			throw err;
		});
	} catch (err) {
		res.status(500).json({ error: (err as Error).message });
	}
}
