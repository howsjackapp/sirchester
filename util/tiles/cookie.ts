import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';

import { gallery } from './gallery';
import { TileState } from './tiles';

export const COOKIE_TILE_STATE = 'sirchester_tile_state';

export interface PropsWithTileState {
	tileState: TileState;
}

/**
 * Return the `getServerSideProps` of any page that needs reads the tile state
 * from cookies.
 *
 * @param context - The Next API context.
 */
// eslint-disable-next-line @typescript-eslint/require-await
export const tilesGetServerSideProps: GetServerSideProps = async (context) => {
	const tileStateStr = getCookie(COOKIE_TILE_STATE, context) as string;

	const tileState = tileStateStr
		? (JSON.parse(tileStateStr) as TileState)
		: gallery.ddgTrio;

	return {
		props: { tileState },
	};
};
