import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import { Customizer, Footer } from '../components';
import { useTileState } from '../util/context';

const Customize: NextPage = () => {
	const [tileState, setTileState] = useTileState();

	if (!tileState) {
		return <p>loading...</p>;
	}

	return (
		<>
			<Head>
				<title>Customize - Sir Chester</title>
			</Head>
			<Customizer
				initialTileState={tileState}
				onSetTileState={setTileState}
			/>
			<Footer />
		</>
	);
};

export default Customize;
