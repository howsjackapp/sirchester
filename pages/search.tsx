import { Button, Tooltip } from '@geist-ui/react';
import { Edit } from '@geist-ui/react-icons';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import { isArray } from 'util';

import { useTileState } from '../util/context';
import { getSearchEngine, getTileName, Tile } from '../util/tiles/tiles';
import styles from './search.module.css';

const Search: NextPage = () => {
	const router = useRouter();
	const [tileState] = useTileState();
	const { q } = router.query;

	if (!tileState) {
		return <p>loading...</p>;
	}

	if (!q || isArray(q)) {
		return <p>please add a ?q= to the URL</p>;
	}

	return (
		<>
			<Head>
				<title>{q} - Multisearch</title>
			</Head>
			<Mosaic<number>
				renderTile={(id, path) => (
					<MosaicWindow<number>
						className="no-toolbar"
						draggable={false}
						path={path}
						title={getTileName(tileState.tiles[id])}
					>
						<iframe
							src={getIframeUrl(tileState.tiles[id], q)}
							style={{ width: '100%', height: '100%' }}
						/>
					</MosaicWindow>
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

/**
 * Get the URL to show in an iframe.
 */
function getIframeUrl(tile: Tile, query: string): string {
	const se = getSearchEngine(tile);
	const url = se.searchString?.replaceAll('%s', query);

	if (!url) {
		throw new Error('url is empty in getIframeUrl');
	}

	if (se.proxy) {
		return `https://multisearch-proxy.vercel.app/?__multisearch_target=${encodeURIComponent(
			url
		)}`;
	}

	return url;
}

export default Search;
