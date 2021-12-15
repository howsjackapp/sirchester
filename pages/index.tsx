import { Button, Input, Link, Page, Spacer, Text } from '@geist-ui/react';
import { Search } from '@geist-ui/react-icons';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { FormEventHandler, useState } from 'react';

const Home: NextPage = () => {
	const router = useRouter();
	const [q, setQ] = useState('');

	const handleSubmit: FormEventHandler<unknown> = (event) => {
		event.preventDefault();

		if (!q) {
			return;
		}

		router.push(`/search?q=${q}`).catch(alert);
	};

	return (
		<Page className="container">
			<Page.Content>
				<h1>Multisearch</h1>
				<p>Multi-query multi-engine search. Fully customizable.</p>
				<form onSubmit={handleSubmit}>
					<Input
						autoFocus
						icon={<Search />}
						name="search"
						onChange={(v) => setQ(v.target.value)}
						value={q}
						width="100%"
					/>
					<Spacer h={1} />
					<div className="flex justify-center">
						<Button onClick={handleSubmit} type="secondary">
							Search
						</Button>
					</div>
				</form>

				<Spacer h={15} />
				<h2>Why?</h2>
				<p>
					Because Google results have been spammy and useless lately.
					Adding &quot;reddit&quot; or &quot;hacker news&quot; often
					yields better results.
				</p>

				<Text blockquote small>
					&quot;I estimate that about half of my searches have either
					site:reddit.com or site:news.ycombinator.com at the
					end.&quot;
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
					&quot;Its pretty often that I do a search, get bad results,
					then add reddit and get good results, so I hope some data
					analyst in Google sees those as opportunities to
					improve.&quot;
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

			<footer>
				<p className="text-center">
					Multisearch is an open-source website with no ads, see{' '}
					<Link
						color
						href="https://github.com/amaurym/multisearch"
						icon
						target="_blank"
						rel="noreferrer"
					>
						source code
					</Link>
					. Its business model is{' '}
					<Link
						color
						href="https://github.com/sponsors/amaurym"
						icon
						target="_blank"
						rel="noreferrer"
					>
						donations
					</Link>
					.
				</p>
				<p className="text-center">
					Copyright{' '}
					<Link
						color
						href="https://github.com/amaurym"
						icon
						target="_blank"
						rel="noreferrer"
					>
						@amaurym
					</Link>{' '}
					2022.
				</p>
			</footer>
		</Page>
	);
};

export default Home;
