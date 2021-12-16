import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import { Customizer } from '../components/Customizer';
import { useTileState } from '../util/context';

const Customize: NextPage = () => {
	const [tileState, setTileState] = useTileState();

	if (!tileState) {
		return <p>loading...</p>;
	}

	return (
		<>
			<Head>
				<title>Customize - Multisearch</title>
			</Head>
			<Customizer
				initialTileState={tileState}
				onSetTileState={setTileState}
			/>
		</>
	);
};

export default Customize;
