import type { TileState } from '../tiles';

export const gallery: Record<string, TileState> = {
	ddgTrio: {
		currentNode: {
			direction: 'row',
			first: 0,
			second: {
				direction: 'column',
				first: 1,
				second: 2,
				splitPercentage: 50,
			},
			splitPercentage: 60,
		},
		description:
			'Three tiles with DuckDuckGo default search, with "reddit" and with "hacker news"',
		name: 'DuckDuckGo Trio',
		tiles: {
			0: { type: 'PRESHIPPED', id: 'ddg' },
			1: { type: 'PRESHIPPED', id: 'ddgReddit' },
			2: { type: 'PRESHIPPED', id: 'ddgHn' },
		},
	},
	googleTrio: {
		currentNode: {
			direction: 'row',
			first: 0,
			second: {
				direction: 'column',
				first: 1,
				second: 2,
				splitPercentage: 50,
			},
			splitPercentage: 60,
		},
		description:
			'Three tiles with Google default search, with "reddit" and with "hacker news"',
		name: 'Google Trio',
		tiles: {
			0: { type: 'PRESHIPPED', id: 'google' },
			1: { type: 'PRESHIPPED', id: 'googleReddit' },
			2: { type: 'PRESHIPPED', id: 'googleHn' },
		},
	},
	startpageTrio: {
		currentNode: {
			direction: 'row',
			first: 0,
			second: {
				direction: 'column',
				first: 1,
				second: 2,
				splitPercentage: 50,
			},
			splitPercentage: 60,
		},
		description:
			'Three tiles with Startpage default search, with "reddit" and with "hacker news"',
		name: 'Startpage Trio',
		tiles: {
			0: { type: 'PRESHIPPED', id: 'startpage' },
			1: { type: 'PRESHIPPED', id: 'startpageReddit' },
			2: { type: 'PRESHIPPED', id: 'startpageHn' },
		},
	},
};
