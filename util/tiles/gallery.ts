import google_ddg from '../../gallery/google_ddg.json';
import google_reddit_ddg from '../../gallery/google_reddit_ddg.json';
import sp_reddit_marginalia from '../../gallery/sp_reddit_marginalia.json';
import type { TileState } from './tiles';

/**
 * gallery contains the TileStates pre-shipped by Sir Chester. They are
 * displayed in the /gallery page.
 *
 * If you would like to add a TileState, please create a PR:
 * https://github.com/sirchesterapp/webapp
 */
export const gallery: Record<string, TileState> = {
	google_ddg: google_ddg as TileState,
	google_reddit_ddg: google_reddit_ddg as TileState,
	sp_reddit_marginalia: sp_reddit_marginalia as TileState,
};
