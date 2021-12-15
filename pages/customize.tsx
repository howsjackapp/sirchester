import type { NextPage } from 'next';
import React from 'react';

import { Customizer } from '../components/Customizer';
import { useTileState } from '../util/context';

const Customize: NextPage = () => {
	const [tileState, setTileState] = useTileState();

	if (!tileState) {
		return <p>loading...</p>;
	}

	return (
		<Customizer
			initialTileState={tileState}
			onSetTileState={setTileState}
		/>
	);
};

export default Customize;
