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

import { Footer } from '../components';
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
			<a
				href="https://github.com/SirChesterApp/webapp"
				className="github-corner"
				aria-label="View source on GitHub"
				target="_blank"
				rel="noopener noreferrer"
			>
				<svg
					width="80"
					height="80"
					viewBox="0 0 250 250"
					style={{
						fill: '#151513',
						color: '#fff',
						position: 'absolute',
						top: 0,
						border: 0,
						right: 0,
					}}
					aria-hidden="true"
				>
					<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
					<path
						d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
						fill="currentColor"
						style={{ transformOrigin: '130px 106px' }}
						className="octo-arm"
					></path>
					<path
						d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
						fill="currentColor"
						className="octo-body"
					></path>
				</svg>
			</a>
			<Head>
				<title>Sir Chester - Here to help with your searches</title>
			</Head>
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
					<h2>Example with &quot;burger paris&quot;</h2>
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
							target="_blank"
							rel="noreferrer"
						>
							@dluan
						</Link>
						,{' '}
						<Link
							color
							href="https://news.ycombinator.com/item?id=27390626"
							target="_blank"
							rel="noreferrer"
						>
							@hidden-spyder
						</Link>{' '}
						and{' '}
						<Link
							color
							href="https://news.ycombinator.com/item?id=28903723"
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
