import React, {
	createContext,
	FC,
	useContext,
	useEffect,
	useState,
} from 'react';

import { defaultTiles, TileState } from './tiles';

const LS_TILES_KEY = 'LS_TILES_KEY';

const LSContext = createContext<TileState>({} as TileState);

export const LSWrapper: FC = ({ children }) => {
	const [tiles, setTiles] = useState<TileState>(defaultTiles);

	useEffect(() => {
		const tilesStr =
			typeof window === 'undefined'
				? null
				: localStorage.getItem(LS_TILES_KEY);

		if (tilesStr !== null) {
			setTiles(JSON.parse(tilesStr) as TileState);
		}
	}, []);

	return <LSContext.Provider value={tiles}>{children}</LSContext.Provider>;
};

export function useTileState(): TileState {
	return useContext(LSContext);
}
