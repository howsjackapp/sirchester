import Head from 'next/head';
import React from 'react';

import {
	Chat,
	CookieBanner,
	Customizer,
	Footer,
	SizeGuard,
} from '../components';
import { PropsWithTileState, tilesGetServerSideProps } from '../util';

export const getServerSideProps = tilesGetServerSideProps;

type SearchProps = PropsWithTileState;

function Customize({ tileState }: SearchProps): React.ReactElement | null {
	return (
		<>
			<Head>
				<title>Customize - Sir Chester</title>
			</Head>

			<Chat />
			<CookieBanner force />
			<SizeGuard />

			<Customizer initialTileState={tileState} />
			<Footer />
		</>
	);
}

export default Customize;
