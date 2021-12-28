import {
	Button,
	Display,
	Image,
	Input,
	Link,
	Page,
	Spacer,
	Text,
} from '@geist-ui/react';
import { Search } from '@geist-ui/react-icons';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import React, { FormEventHandler, useState } from 'react';

import { Chat, CookieBanner, Footer, GithubBanner } from '../components';
import styles from './index.module.css';

const Home: NextPage = () => {
	const router = useRouter();
	const [q, setQ] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit: FormEventHandler<unknown> = (event) => {
		setLoading(true);
		event.preventDefault();

		if (!q) {
			return;
		}

		router.push(`/search?q=${q}`).catch(alert);
	};

	return (
		<>
			<Head>
				<title>
					Sir Chester - Append &quot;reddit&quot; or &quot;hacker
					news&quot; to your search queries
				</title>
			</Head>

			<GithubBanner />
			<Chat />
			<CookieBanner />

			<Page className="container">
				<Page.Content>
					<h1>
						<NextImage
							className={styles.logo}
							height={40}
							src="/logo/moustache-128.png"
							width={40}
						/>{' '}
						Sir Chester
					</h1>
					<p>
						Sir Chester appends &quot;reddit&quot; or &quot;hacker
						news&quot; to your search queries.
					</p>
					<Spacer h={2} />
					<form onSubmit={handleSubmit}>
						<Input
							autoFocus
							icon={<Search />}
							name="search"
							onChange={(v) => setQ(v.target.value)}
							placeholder='Try "burger paris"'
							scale={2}
							value={q}
							width="100%"
						/>
						<Spacer h={1} />
						<div className="flex justify-center">
							<Button
								disabled={loading}
								loading={loading}
								onClick={handleSubmit}
								scale={1.5}
								type="secondary"
							>
								Search
							</Button>
						</div>
					</form>

					<Spacer h={10} />
					<h2>Example with &quot;best burger paris&quot;</h2>
					<Display
						caption='Startpage results, with "reddit" and "hacker news"'
						shadow
					>
						<Image.Browser
							url="https://sirchester.app/search?q=burger paris"
							anchorProps={{ rel: 'nofollow' }}
						>
							<Image src="/screenshot-best-burger-paris.png" />
						</Image.Browser>
					</Display>

					<h2>Why?</h2>
					<p>
						Because Google results have been spammy and useless
						lately. Adding &quot;reddit&quot; or &quot;hacker
						news&quot; often yields better results.
					</p>

					<Text blockquote small>
						&quot;I estimate that about half of my searches have
						either site:reddit.com or site:news.ycombinator.com at
						the end.&quot;
						<br />
						<i>
							- @copperx on{' '}
							<Link
								href="https://news.ycombinator.com/item?id=29423760"
								icon
								target="_blank"
								rel="noreferrer"
							>
								Hacker News
							</Link>
						</i>
					</Text>

					<Text blockquote small>
						&quot;Its pretty often that I do a search, get bad
						results, then add reddit and get good results, so I hope
						some data analyst in Google sees those as opportunities
						to improve.&quot;
						<br />-{' '}
						<i>
							@EE84M3i on{' '}
							<Link
								href="https://news.ycombinator.com/item?id=28903560"
								icon
								target="_blank"
								rel="noreferrer"
							>
								Hacker News
							</Link>
						</i>
					</Text>
					<p>
						Also{' '}
						<Link
							color
							href="https://news.ycombinator.com/item?id=23208357"
							icon
							target="_blank"
							rel="noreferrer"
						>
							@dluan
						</Link>
						,{' '}
						<Link
							color
							href="https://news.ycombinator.com/item?id=27390626"
							icon
							target="_blank"
							rel="noreferrer"
						>
							@hidden-spyder
						</Link>{' '}
						and{' '}
						<Link
							color
							href="https://news.ycombinator.com/item?id=28903723"
							icon
							target="_blank"
							rel="noreferrer"
						>
							@hihihihi1234
						</Link>
						.
					</p>
				</Page.Content>
			</Page>
			<Footer />
		</>
	);
};

export default Home;
