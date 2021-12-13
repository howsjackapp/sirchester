import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Mosaic, MosaicNode, MosaicWindow } from 'react-mosaic-component';
import { isArray } from 'util';

type TileId = number;

interface Tile {
	name: string;
	searchString?: string;
	useProxy?: boolean;
}

type TileState = {
	currentNode: MosaicNode<TileId> | null;
	tiles: Tile[];
};

// - Google: https://google.com/search?igu=1&q=%s

const defaultState: TileState = {
	currentNode: {
		direction: 'row',
		first: 0,
		second: {
			direction: 'column',
			first: 1,
			second: 2,
			splitPercentage: 60,
		},
		splitPercentage: 60,
	},
	tiles: [
		{
			name: 'Startpage',
			searchString: 'https://startpage.com/do/dsearch??query=%s',
			useProxy: true,
		},
		{
			name: 'Startpage search for Reddit',
			searchString: 'https://startpage.com/do/dsearch??query=%s+reddit',
		},
		{
			name: 'Startpage search for HN',
			searchString:
				'https://startpage.com/do/dsearch??query=%s+hacker+news',
		},
	],
};

const Home: NextPage = () => {
	const router = useRouter();
	const [tileState] = useState(defaultState);
	const { q } = router.query;

	if (!q || isArray(q)) {
		return <p>Please add a ?q=</p>;
	}

	return q ? (
		<Mosaic<TileId>
			renderTile={(id, path) => (
				<MosaicWindow<TileId>
					path={path}
					title={tileState.tiles[id].name}
				>
					<iframe
						src={getIframeUrl(tileState.tiles[id], q)}
						style={{ width: '100%', height: '100%' }}
					/>
				</MosaicWindow>
			)}
			initialValue={tileState.currentNode}
		/>
	) : (
		<p>loading...</p>
	);
};

/**
 * Get the URL to show in an iframe.
 */
function getIframeUrl(tile: Tile, query: string): string {
	const url = tile.searchString?.replaceAll('%s', query);

	if (!url) {
		throw new Error('url is empty in getIframeUrl');
	}

	if (tile.useProxy) {
		return `/api/proxy?q=${encodeURIComponent(url)}`;
	}

	return url;
}

export default Home;
