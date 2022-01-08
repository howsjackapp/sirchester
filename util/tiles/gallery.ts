import type { TileState } from './tiles';

/**
 * gallery contains the TileStates pre-shipped by Sir Chester. They are
 * displayed in the /gallery page.
 *
 * If you would like to add a TileState, please create a PR.
 */
export const gallery: Record<string, TileState> = {
	ddgTrio: {
		author: 'amaurym',
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
			0: { type: 'PRESHIPPED', id: 'ddg', proxy: { enabled: true } },
			1: {
				type: 'PRESHIPPED',
				id: 'ddgReddit',
				proxy: { enabled: true },
			},
			2: { type: 'PRESHIPPED', id: 'ddgHn', proxy: { enabled: true } },
		},
	},
	googleTrio: {
		author: 'amaurym',
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
	startpageMarginalia: {
		author: 'amaurym',
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
			'Startpage default search, append "reddit", and also show Marginalia',
		name: 'Startpage, w/ Reddit and Marginalia',
		tiles: {
			0: {
				type: 'PRESHIPPED',
				id: 'startpage',
				proxy: { enabled: true },
			},
			1: {
				type: 'PRESHIPPED',
				id: 'startpageReddit',
				proxy: { enabled: true },
			},
			2: {
				type: 'PRESHIPPED',
				id: 'marginalia',
				proxy: { enabled: true },
				scrollY: 100,
			},
		},
	},
	startpageTrio: {
		author: 'amaurym',
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
			0: {
				type: 'PRESHIPPED',
				id: 'startpage',
				proxy: { enabled: true },
			},
			1: {
				type: 'PRESHIPPED',
				id: 'startpageReddit',
				proxy: { enabled: true },
			},
			2: {
				type: 'PRESHIPPED',
				id: 'startpageHn',
				proxy: { enabled: true },
			},
		},
	},
};
