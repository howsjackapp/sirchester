import { MosaicNode } from 'react-mosaic-component';

export interface SearchEngine {
	name: string;
	searchString: string;
	useProxy?: boolean;
}

export interface PreshippedTile {
	type: 'PRESHIPPED';
	id: keyof typeof preShippedTiles;
}

export interface CustomTile extends SearchEngine {
	type: 'CUSTOM';
}

export type Tile = PreshippedTile | CustomTile;

export type TileMap = Record<number, Tile>;

export type TileState = {
	currentNode: MosaicNode<number> | null;
	tiles: TileMap;
};

export const preShippedTiles = {
	google: {
		name: 'Google',
		searchString: 'https://google.com/search?igu=1&q=%s',
	},
	googleReddit: {
		name: 'Google search for Reddit',
		searchString: 'https://google.com/search?igu=1&q=%s+reddit',
	},
	googleHn: {
		name: 'Google search for HN',
		searchString: 'https://google.com/search?igu=1&q=%s+hacker+news',
	},
	startpage: {
		name: 'Startpage',
		searchString:
			'https://startpage.com/do/dsearch?query=%s&cat=web&pl=ext-ff&language=english&extVersion=1.3.0',
		useProxy: true,
	},
	startpageReddit: {
		name: 'Startpage search for Reddit',
		searchString:
			'https://startpage.com/do/dsearch?query=%s+reddit&cat=web&pl=ext-ff&language=english&extVersion=1.3.0',
		useProxy: true,
	},
	startpageHn: {
		name: 'Startpage search for HN',
		searchString:
			'https://startpage.com/do/dsearch?query=%s+hacker+news&cat=web&pl=ext-ff&language=english&extVersion=1.3.0',
		useProxy: true,
	},
};

export const defaultTiles: TileState = {
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
	tiles: {
		0: { type: 'PRESHIPPED', id: 'startpage' },
		1: { type: 'PRESHIPPED', id: 'startpageReddit' },
		2: { type: 'PRESHIPPED', id: 'startpageHn' },
	},
};

export function getTileName(tile: Tile): string {
	return tile.type === 'PRESHIPPED'
		? preShippedTiles[tile.id].name
		: tile.name;
}

export function isPreshippedTile(tile: Tile): tile is PreshippedTile {
	return tile.type === 'PRESHIPPED';
}

export function getSearchEngine(tile: Tile): SearchEngine {
	return tile.type === 'PRESHIPPED' ? preShippedTiles[tile.id] : tile;
}
