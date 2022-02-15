import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

import { gallery } from './gallery';
import { TileState } from './tiles';

export const COOKIE_TILE_STATE = 'sirchester_tile_state';

export const TILE_STATE_QUERY_PARAM = 'tile_state';

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
	const tileStateStr = (parseQueryParam(context.query) ||
		getCookie(COOKIE_TILE_STATE, context)) as string;

	const tileState = tileStateStr
		? (JSON.parse(tileStateStr) as TileState)
		: gallery.google_reddit_ddg;

	return {
		props: { tileState },
	};
};

/**
 * Parse the query params for tile state.
 *
 * @param queryParam - The Next query params.
 */
function parseQueryParam(queryParam: ParsedUrlQuery): string | undefined {
	const q = queryParam[TILE_STATE_QUERY_PARAM];
	if (!q || Array.isArray(q)) {
		return undefined;
	}

	const buf = Buffer.from(q, 'base64');
	return buf.toString('utf8');
}
