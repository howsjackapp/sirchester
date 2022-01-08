import { MosaicNode } from 'react-mosaic-component';

import { preShippedSearchEngines, SearchEngine } from './searchengines';

export interface SearchEngineProxy {
	addIncomingHeaders?: [string, string][];
	enabled: boolean;
}

interface ComminTile {
	proxy?: SearchEngineProxy;
	/**
	 * Scroll the iframe by Y pixels down on load.
	 */
	scrollY?: number;
}

export interface PreshippedTile extends ComminTile {
	type: 'PRESHIPPED';
	id: keyof typeof preShippedSearchEngines;
}

export interface CustomTile extends ComminTile, SearchEngine {
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
