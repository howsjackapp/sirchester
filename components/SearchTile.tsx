import { Loading } from '@geist-ui/react';
import React, { useEffect, useState } from 'react';
import { MosaicBranch, MosaicWindow } from 'react-mosaic-component';

import {
	getSearchEngine,
	getTileName,
	SearchEngineProxy,
	Tile,
	TileState,
} from '../util';
import { Iframe } from './Iframe';

export interface TileProps {
	id: number;
	onIframeClick: () => void;
	/**
	 * The `?q=` query parameter, representing the user search string.
	 */
	q: string;
	path: MosaicBranch[];
	/**
	 * Scroll the iframe by Y pixels down on load.
	 */
	scrollY?: number;
	tileState: TileState;
}

export function SearchTile({
	id,
	onIframeClick,
	path,
	q,
	scrollY,
	tileState,
}: TileProps): React.ReactElement {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 500);
	});

	return (
		<MosaicWindow<number>
			className="no-toolbar"
			draggable={false}
			path={path}
			title={getTileName(tileState.tiles[id])}
		>
			{loading && <Loading />}
			<Iframe
				className={`full-width full-height ${loading ? 'hide' : ''}`}
				onInferredClick={onIframeClick}
				onInferredLoad={(el) => {
					console.log('SCROLLING by ', scrollY, 'on ', id);
					el.contentDocument?.documentElement.scrollBy({
						top: scrollY,
					});
				}}
				src={getIframeUrl(tileState.tiles[id], q)}
			/>
		</MosaicWindow>
	);
}

/**
 * Get the URL to show in an iframe.
 */
function getIframeUrl(tile: Tile, query: string): string {
	const se = getSearchEngine(tile);
	const url = se.searchString?.replace(/%s/g, query);

	if (!url) {
		throw new Error('url is empty in getIframeUrl');
	}

	if (!process.env.NEXT_PUBLIC_PROXY_URL) {
		throw new Error('url is empty in getIframeUrl');
	}

	if (tile.proxy) {
		return `${getProxyUrl(
			tile.proxy,
			url
		)}/?__sirchester_target=${encodeURIComponent(url)}`;
	}

	return url;
}

function getProxyUrl(proxy: SearchEngineProxy, targetUrl: string): string {
	if (proxy.hostname !== 'SIRCHESTER') {
		return proxy.hostname;
	}

	// If the proxy hostname is "SIRCHESTER", we actually provide proxies for
	// some search engines. These proxies allow embedding in iframes.
	// See https://github.com/SirChesterApp/proxy.
	if (targetUrl.startsWith('https://google.com')) {
		return 'https://google.sirchester.app';
	}
	if (targetUrl.startsWith('https://startpage.com')) {
		return 'https://sp.sirchester.app';
	}
	if (targetUrl.startsWith('https://duckduckgo.com')) {
		return 'https://ddg.sirchester.app';
	}
	if (targetUrl.startsWith('https://search.marginalia.nu')) {
		return 'https://marginalia.sirchester.app';
	}

	throw new Error(
		`No proxy currently supported for ${targetUrl}. Please raise an issue on https://github.com/SirChesterApp/proxy.`
	);
}
