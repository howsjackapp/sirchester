export const preShippedSearchEngines = {
	ddg: {
		description: 'Default DuckDuckGo search',
		image: '/searchengines/ddg.svg',
		name: 'DuckDuckGo',
		searchString: 'https://duckduckgo.com/?q=%s&ia=web',
		useProxy: true,
	},
	ddgReddit: {
		description: 'Default DuckDuckGo search, but append "reddit"',
		image: '/searchengines/ddg.svg',
		name: 'DuckDuckGo search for Reddit',
		searchString: 'https://duckduckgo.com/?q=%s+reddit&ia=web',
		useProxy: true,
	},
	ddgHn: {
		description: 'Default DuckDuckGo search, but append "hacker news"',
		image: '/searchengines/ddg.svg',
		name: 'DuckDuckGo search for HN',
		searchString: 'https://duckduckgo.com/?q=%s+hacker+news&ia=web',
		useProxy: true,
	},
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
