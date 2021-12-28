import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Mosaic } from 'react-mosaic-component';
import { isArray } from 'util';

import { Fab, SizeGuard, Tile } from '../components';
import { PropsWithTileState, tilesGetServerSideProps } from '../util';

export const getServerSideProps = tilesGetServerSideProps;

type SearchProps = PropsWithTileState;

function Search({ tileState }: SearchProps): React.ReactElement | null {
	const [open, setOpen] = useState(false);
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

			<SizeGuard />
			<Fab q={q} open={open} onOpen={setOpen} />

			<Mosaic<number>
				renderTile={(id, path) => (
					<Tile
						id={id}
						onIframeClick={() => {
							setOpen(false);
						}}
						path={path}
						q={q}
						tileState={tileState}
					/>
				)}
				initialValue={tileState.currentNode}
				resize="DISABLED"
			/>
		</>
	);
}

export default Search;
