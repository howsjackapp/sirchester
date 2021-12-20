/* eslint-disable */

import { CssBaseline } from '@geist-ui/react';
import Document, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document';
import React from 'react';

// @ts-ignore
export default class extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		// @ts-ignore
		const initialProps = await Document.getInitialProps(ctx);
		const styles = CssBaseline.flush(); // eslint-disable-line

		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					{styles}
				</>
			),
		};
	}

	render(): React.ReactElement {
		return (
			<Html>
				<Head>
					<link
						rel="shortcut icon"
						href="/favicon.png"
						type="image/x-icon"
					/>
					<script
						async
						src="https://scripts.simpleanalyticscdn.com/latest.js"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
