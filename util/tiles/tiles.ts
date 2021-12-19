import { MosaicNode } from 'react-mosaic-component';

import { preShippedSearchEngines } from './searchengines';

export interface SearchEngine {
	description: string;
	image?: string;
	name: string;
	searchString: string;
	proxy?: SearchEngineProxy;
}

export interface SearchEngineProxy {
	addIncomingHeaders: [string, string][];
}

export interface PreshippedTile {
	type: 'PRESHIPPED';
	id: keyof typeof preShippedSearchEngines;
}

export interface CustomTile extends SearchEngine {
	type: 'CUSTOM';
}

export type Tile = PreshippedTile | CustomTile;

export type TileMap = Record<number, Tile>;

export interface TileState {
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
