import { Page } from '@geist-ui/react';
import Head from 'next/head';
import React from 'react';

import { Chat, Footer, GithubBanner, Nav } from '../components';

function Faq(): React.ReactElement {
	return (
		<>
			<Head>
				<title>F.A.Q. - Sir Chester</title>
			</Head>
			<GithubBanner />
			<Chat />

			<Nav />
			<Page className="container">
				<Page.Content>
					<h1>F.A.Q.</h1>
					<p>
						Sir Chester appends &quot;reddit&quot; or &quot;hacker
						news&quot; to your search queries.
					</p>

					<h2>TODO</h2>
					<p>TODO</p>
				</Page.Content>
			</Page>
			<Footer />
		</>
	);
}

export default Faq;
