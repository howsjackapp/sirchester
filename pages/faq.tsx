import { Page } from '@geist-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { Chat, Footer, GithubBanner, Nav } from '../components';
import { passQueryParams, tilesGetServerSideProps } from '../util';

export const getServerSideProps = tilesGetServerSideProps;

function Faq(): React.ReactElement {
	const router = useRouter();

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

					<h2>Why does Sir Chester use cookies?</h2>
					<p>
						Sir Chester saves your search engine preferences in a
						cookie. When you{' '}
						<Link href={passQueryParams(router.asPath, '/gallery')}>
							customize
						</Link>{' '}
						the search engine layout and click on &quot;Save as
						default&quot;, we save that configuration in a cookie.
					</p>
				</Page.Content>
			</Page>
			<Footer />
		</>
	);
}

export default Faq;
