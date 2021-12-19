import React, {
	createContext,
	FC,
	useContext,
	useEffect,
	useState,
} from 'react';

import { gallery } from './tiles';
import { TileState } from './tiles/tiles';

const LS_TILES_KEY = 'LS_TILES_KEY';

type LSContextType = [TileState | null, (ts: TileState) => void];

const LSContext = createContext<LSContextType>([] as unknown as LSContextType);

export const LSWrapper: FC = ({ children }) => {
	const [tiles, setTiles] = useState<TileState | null>(null);

	useEffect(() => {
		const tilesStr =
			typeof window === 'undefined'
				? null
				: localStorage.getItem(LS_TILES_KEY);

		if (tilesStr !== null) {
			setTiles(JSON.parse(tilesStr) as TileState);
		} else {
			setTiles(gallery.googleTrio);
		}
	}, []);

	useEffect(() => {
		if (!tiles) {
			return;
		}

		localStorage.setItem(LS_TILES_KEY, JSON.stringify(tiles));
	}, [tiles]);

	return (
		<LSContext.Provider value={[tiles, setTiles]}>
			{children}
		</LSContext.Provider>
	);
};

export function useTileState(): LSContextType {
	return useContext(LSContext);
}
