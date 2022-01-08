export interface SearchEngine {
	description: string;
	image: string;
	name: string;
	searchString: string;
}

export const preShippedSearchEngines = {
	ddg: {
		description: 'Default DuckDuckGo search',
		image: '/searchengines/ddg.svg',
		name: 'DuckDuckGo',
		searchString: 'https://duckduckgo.com/?q=%s&ia=web',
	},
	ddgReddit: {
		description: 'Append "reddit" to DDG search',
		image: '/searchengines/ddg.svg',
		name: 'DuckDuckGo+Reddit',
		searchString: 'https://duckduckgo.com/?q=%s+reddit&ia=web',
	},
	ddgHn: {
		description: 'Append "hacker news" to DDG search',
		image: '/searchengines/ddg.svg',
		name: 'DuckDuckGo+HN',
		searchString: 'https://duckduckgo.com/?q=%s+hacker+news&ia=web',
	},
	google: {
		description: 'Default Google search',
		image: '/searchengines/google.svg',
		name: 'Google',
		searchString: 'https://google.com/search?igu=1&q=%s',
	},
	googleReddit: {
		description: 'Append "reddit" to Goole search',
		image: '/searchengines/google.svg',
		name: 'Google+Reddit',
		searchString: 'https://google.com/search?igu=1&q=%s+reddit',
	},
	googleHn: {
		description: 'Append "hacker news" to Goole search',
		image: '/searchengines/google.svg',
		name: 'Google+HN',
		searchString: 'https://google.com/search?igu=1&q=%s+hacker+news',
	},
	marginalia: {
		description: 'Favors text-heavy websites',
		image: '/searchengines/google.svg',
		name: 'Marginalia',
		searchString: 'https://search.marginalia.nu/search?query=%s',
	},
	startpage: {
		description: 'Default Startpage search',
		image: '/searchengines/startpage.svg',
		name: 'Startpage',
		searchString:
			'https://startpage.com/do/dsearch?query=%s&cat=web&pl=ext-ff&language=english&extVersion=1.3.0',
	},
	startpageReddit: {
		description: 'Append "reddit" to Startpage search',
		image: '/searchengines/startpage.svg',
		name: 'Startpage+Reddit',
		searchString:
			'https://startpage.com/do/dsearch?query=%s+reddit&cat=web&pl=ext-ff&language=english&extVersion=1.3.0',
	},
	startpageHn: {
		description: 'Append "hacker news" to Startpage search',
		image: '/searchengines/startpage.svg',
		name: 'Startpage+HN',
		searchString:
			'https://startpage.com/do/dsearch?query=%s+hacker+news&cat=web&pl=ext-ff&language=english&extVersion=1.3.0',
	},
};
