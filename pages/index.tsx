import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { FormEventHandler } from 'react';

const Home: NextPage = () => {
	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const q = formData.get('search');

		router.push(`/search?q=${q}`).catch(console.error);
	};

	return (
		<>
			<h1>HomePage</h1>
			<form onSubmit={handleSubmit}>
				<input name="search" placeholder="Enter your query" />
				<button>Search</button>
			</form>
		</>
	);
};

export default Home;
