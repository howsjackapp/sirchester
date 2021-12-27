import { Popover } from '@geist-ui/react';
import { QuestionCircle } from '@geist-ui/react-icons';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Mosaic } from 'react-mosaic-component';
import { isArray } from 'util';

import { Tile } from '../components';
import { PropsWithTileState, tilesGetServerSideProps } from '../util';
import styles from './search.module.css';

export const getServerSideProps = tilesGetServerSideProps;

type SearchProps = PropsWithTileState;

function Search({ tileState }: SearchProps): React.ReactElement | null {
	const router = useRouter();
	const { q } = router.query;

	if (!q || isArray(q)) {
		return null;
	}

	return (
		<>
			<Head>
				<title>{q} - Sir Chester</title>
			</Head>
			<Mosaic<number>
				renderTile={(id, path) => (
					<Tile id={id} path={path} q={q} tileState={tileState} />
				)}
				initialValue={tileState.currentNode}
				resize="DISABLED"
			/>
			<Popover
				className={styles.fab}
				content={popoverContentWithQ(q)}
				placement="topStart"
				trigger="hover"
			>
				<QuestionCircle />
			</Popover>
		</>
	);
}

function popoverContentWithQ(q: string): () => React.ReactElement {
	const popoverContent = () => (
		<>
			<Popover.Item title>Sir Chester</Popover.Item>
			<Popover.Item>
				<Link href="/">Homepage</Link>
			</Popover.Item>
			<Popover.Item>
				<Link href={`/customize?q=${q}`}>Customize search</Link>
			</Popover.Item>
		</>
	);

	return popoverContent;
}

export default Search;
