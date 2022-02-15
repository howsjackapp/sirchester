export interface SearchEngine {
	description: string;
	image: string;
	name: string;
	searchString: string;
}

export const preShippedSearchEngines = {
	ddg: {
		description: 'Private alternative to Google.',
		image: '/searchengines/ddg.svg',
		name: 'DuckDuckGo',
		searchString: 'https://duckduckgo.com/?q=%s&ia=web',
	},
	google: {
		description: 'You know Google.',
		image: '/searchengines/google.svg',
		name: 'Google',
		searchString: 'https://google.com/search?igu=1&q=%s',
	},
	marginalia: {
		description: 'Indie search engine, favors text-heavy websites.',
		image: '/searchengines/google.svg',
		name: 'Marginalia',
		searchString: 'https://search.marginalia.nu/search?query=%s',
	},
	startpage: {
		description:
			'Private alternative to Google, uses Google under the hood.',
		image: '/searchengines/startpage.svg',
		name: 'Startpage',
		searchString:
			'https://startpage.com/do/dsearch?query=%s&cat=web&pl=ext-ff&language=english&extVersion=1.3.0',
	},
};
