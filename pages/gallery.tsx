import { Page } from '@geist-ui/react';
import Head from 'next/head';
import React from 'react';

import { Chat, Footer, Gallery, GithubBanner, Nav } from '../components';
import { tilesGetServerSideProps } from '../util';

export const getServerSideProps = tilesGetServerSideProps;

function GalleryPage(): React.ReactElement {
	return (
		<>
			<Head>
				<title>Gallery - Sir Chester</title>
			</Head>

			<GithubBanner />
			<Chat />

			<Nav />
			<Page>
				<Page.Content>
					<h1>Gallery</h1>
					<Gallery />
				</Page.Content>
			</Page>
			<Footer />
		</>
	);
}

export default GalleryPage;
