import React, { FC, useState } from 'react';

import { TileState } from '../../util';
import { MosaicContainer } from './MosaicContainer';
import { Toolbar } from './Toolbar';

interface CustomizerProps {
	initialTileState: TileState;
}

export const Customizer: FC<CustomizerProps> = ({ initialTileState }) => {
	const [wip, setWip] = useState(initialTileState); // WIP tileState.

	return (
		<>
			<Toolbar
				initialTileState={initialTileState}
				setWip={setWip}
				wip={wip}
			/>
			<MosaicContainer setWip={setWip} wip={wip} />
		</>
	);
};
