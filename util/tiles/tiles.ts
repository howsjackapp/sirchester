import { MosaicNode } from 'react-mosaic-component';

import { preShippedSearchEngines, SearchEngine } from './searchengines';

export interface SearchEngineProxy {
	addIncomingHeaders?: [string, string][];
	/**
	 * Hostname of the proxy, e.g. `https://me:mypassword@myproxy.com:9005`.
	 * You can also pass "SIRCHESTER", in which case we'll use our own proxies.
	 */
	hostname: string | 'SIRCHESTER';
}

interface CommonTile {
	/**
	 * Optional string to append to the search query. For example, putting
	 * "reddit" here will result in all queries with "reddit" appended.
	 */
	append?: string;
	/**
	 * Optional proxy to use to access the underlying search page.
	 */
	proxy?: SearchEngineProxy;
	/**
	 * Scroll the iframe by Y pixels down on load.
	 */
	scrollY?: number;
}

export interface PreshippedTile extends CommonTile {
	type: 'PRESHIPPED';
	id: keyof typeof preShippedSearchEngines;
}

export interface CustomTile extends CommonTile, SearchEngine {
	type: 'CUSTOM';
}

export type Tile = PreshippedTile | CustomTile;

export type TileMap = Record<number, Tile>;

export interface TileState {
	author: string;
	currentNode: MosaicNode<number> | null;
	description: string;
	name: string;
	tiles: TileMap;
}

export function getTileName(tile: Tile): string {
	return getSearchEngine(tile).name;
}

export function isPreshippedTile(tile: Tile): tile is PreshippedTile {
	return tile.type === 'PRESHIPPED';
}

export function getSearchEngine(tile: Tile): SearchEngine {
	return tile.type === 'PRESHIPPED' ? preShippedSearchEngines[tile.id] : tile;
}
