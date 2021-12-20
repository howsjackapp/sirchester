import { Button, Tooltip } from '@geist-ui/react';
import { Edit } from '@geist-ui/react-icons';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Mosaic } from 'react-mosaic-component';
import { isArray } from 'util';

import { Tile } from '../components';
import { useTileState } from '../util';
import styles from './search.module.css';

const Search: NextPage = () => {
	const router = useRouter();
	const [tileState] = useTileState();
	const { q } = router.query;

	if (!tileState) {
		return null;
	}

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
			<Tooltip
				className={styles.edit}
				placement="topStart"
				text="Click to edit the layout"
				type="secondary"
			>
				<Link href={`/customize?q=${q}`} replace={false}>
					<Button
						auto
						icon={<Edit />}
						scale={0.25}
						type="secondary"
					/>
				</Link>
			</Tooltip>
		</>
	);
};

export default Search;
