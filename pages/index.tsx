import { Input, Page } from '@geist-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { FormEventHandler } from 'react';

const Home: NextPage = () => {
	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const q = formData.get('search')?.toString();

		if (!q) {
			return alert('Please enter a valid query.');
		}

		router.push(`/search?q=${q}`).catch(alert);
	};

	return (
		<Page>
			<Page.Content>
				<h1>Multisearch</h1>
				<form onSubmit={handleSubmit}>
					<Input
						name="search"
						placeholder="Enter your query"
						width="100%"
					/>
					<button>Search</button>
				</form>
			</Page.Content>
		</Page>
	);
};

export default Home;
