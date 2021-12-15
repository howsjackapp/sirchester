import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import { isArray } from 'util';

import { useTileState } from '../util/context';
import { getSearchEngine, getTileName, Tile } from '../util/tiles';

const Search: NextPage = () => {
	const router = useRouter();
	const tileState = useTileState();
	const { q } = router.query;

	if (!q || isArray(q)) {
		return <p>Please add a ?q=</p>;
	}

	return (
		<Mosaic<number>
			renderTile={(id, path) => (
				<MosaicWindow<number>
					className="no-toolbar"
					draggable={false}
					path={path}
					title={getTileName(tileState.tiles[id])}
				>
					<iframe
						src={getIframeUrl(tileState.tiles[id], q)}
						style={{ width: '100%', height: '100%' }}
					/>
				</MosaicWindow>
			)}
			initialValue={tileState.currentNode}
			resize="DISABLED"
		/>
	);
};

/**
 * Get the URL to show in an iframe.
 */
function getIframeUrl(tile: Tile, query: string): string {
	const se = getSearchEngine(tile);
	const url = se.searchString?.replaceAll('%s', query);

	if (!url) {
		throw new Error('url is empty in getIframeUrl');
	}

	if (se.useProxy) {
		return `/api/proxy?q=${encodeURIComponent(url)}`;
	}

	return url;
}

export default Search;
