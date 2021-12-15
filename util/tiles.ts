import { MosaicNode } from 'react-mosaic-component';

export interface SearchEngine {
	description: string;
	image?: string;
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

export interface TileState {
	currentNode: MosaicNode<number> | null;
	tiles: TileMap;
}

export const preShippedTiles = {
	google: {
		description: 'Default Google search',
		image: '/searchengines/google.svg',
		name: 'Google',
		searchString: 'https://google.com/search?igu=1&q=%s',
	},
	googleReddit: {
		description: 'Default Google search, but append "reddit"',
		image: '/searchengines/google.svg',
		name: 'Google search for Reddit',
		searchString: 'https://google.com/search?igu=1&q=%s+reddit',
	},
	googleHn: {
		description: 'Default Google search, but append "hacker news"',
		image: '/searchengines/google.svg',
		name: 'Google search for HN',
		searchString: 'https://google.com/search?igu=1&q=%s+hacker+news',
	},
	startpage: {
		description: 'Default Startpage search',
		image: '/searchengines/startpage.svg',
		name: 'Startpage',
		searchString:
			'https://startpage.com/do/dsearch?query=%s&cat=web&pl=ext-ff&language=english&extVersion=1.3.0',
		useProxy: true,
	},
	startpageReddit: {
		description: 'Default Startpage search, but append "reddit"',
		image: '/searchengines/startpage.svg',
		name: 'Startpage search for Reddit',
		searchString:
			'https://startpage.com/do/dsearch?query=%s+reddit&cat=web&pl=ext-ff&language=english&extVersion=1.3.0',
		useProxy: true,
	},
	startpageHn: {
		description: 'Default Startpage search, but append "hacker news"',
		image: '/searchengines/startpage.svg',
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
	return getSearchEngine(tile).name;
}

export function isPreshippedTile(tile: Tile): tile is PreshippedTile {
	return tile.type === 'PRESHIPPED';
}

export function getSearchEngine(tile: Tile): SearchEngine {
	return tile.type === 'PRESHIPPED' ? preShippedTiles[tile.id] : tile;
}
