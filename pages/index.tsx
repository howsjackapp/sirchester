import { Button, Input, Link, Page, Spacer } from '@geist-ui/react';
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
				<p>Multi-query multi-engine search.</p>
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
			</Page.Content>
			<Page.Footer>
				<p className="text-center">
					Multisearch is an open-source website with no ads, see{' '}
					<Link
						color
						href="https://github.com/amaurym/multisearch"
						icon
					>
						source code
					</Link>
					. Its business model is{' '}
					<Link color href="https://github.com/sponsors/amaurym" icon>
						donations
					</Link>
					.
				</p>
				<p className="text-center">
					Copyright{' '}
					<Link color href="https://github.com/amaurym" icon>
						@amaurym
					</Link>{' '}
					2022.
				</p>
			</Page.Footer>
		</Page>
	);
};

export default Home;
