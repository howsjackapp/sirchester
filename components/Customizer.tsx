import {
	Button,
	ButtonDropdown,
	Card,
	Description,
	Image,
	Select,
	Spacer,
	Text,
	Tooltip,
	useToasts,
} from '@geist-ui/react';
import { Info, RotateCcw, X } from '@geist-ui/react-icons';
import { setCookies } from 'cookies-next';
import debug from 'debug';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import {
	getLeaves,
	Mosaic,
	MosaicNode,
	MosaicWindow,
	RemoveButton,
	SplitButton,
} from 'react-mosaic-component';

import {
	COOKIE_TILE_STATE,
	gallery,
	getSearchEngine,
	getTileName,
	getURL,
	isPreshippedTile,
	passQueryParams,
	preShippedSearchEngines,
	TILE_STATE_QUERY_PARAM,
	TileMap,
	TileState,
} from '../util';
import { Nav } from './Nav';

const l = debug('sirchester:customize');

interface CustomizerProps {
	initialTileState: TileState;
}

export const Customizer: FC<CustomizerProps> = ({ initialTileState }) => {
	const router = useRouter();
	const [wip, setWip] = useState(initialTileState); // WIP tileState.
	const [, setToast] = useToasts();
	const { q } = router.query;

	// Save current state to cookies.
	function saveCookies(): void {
		// Set cookie to expire in a far away future,.
		setCookies(COOKIE_TILE_STATE, wip, { expires: new Date('2050-01-01') });
	}

	// Get the base64 encoding of the current wip tile state.
	function getWipBase64(): string {
		return Buffer.from(JSON.stringify(wip)).toString('base64');
	}

	function handleChangeTile(leafId: number) {
		return function (newValue: string | string[]): void {
			const v = newValue as keyof typeof preShippedSearchEngines;
			if (preShippedSearchEngines[v]) {
				setWip({
					...wip,
					tiles: {
						...wip?.tiles,
						[leafId]: { type: 'PRESHIPPED', id: v },
					},
				});
			} else {
				alert(
					'Custom search engines are not supported yet. See issue TODO'
				);
			}
		};
	}

	function handlePreview(): void {
		setToast({
			actions: [
				{
					handler: (_e, cancel) => {
						router
							.push(passQueryParams(router.asPath, '/customize'))
							.catch(alert);
						cancel();
					},
					name: 'Edit more',
				},
				{
					handler: (_e, cancel) => {
						cancel();
					},
					name: 'Close',
					passive: true,
				},
			],
			delay: 999999999,
			text: 'Previewing new configuration.',
		});

		router
			.push(
				passQueryParams(router.asPath, q ? '/search' : '/', [
					[TILE_STATE_QUERY_PARAM, getWipBase64()],
				])
			)
			.catch(alert);
	}

	function handleSave(): void {
		saveCookies();
		setToast({
			delay: 3000,
			text: 'Successfully saved new configuration.',
			type: 'success',
		});

		router
			.push(
				passQueryParams(router.asPath, q ? '/search' : '/', undefined, [
					TILE_STATE_QUERY_PARAM,
				])
			)
			.catch(alert);
	}

	function handleShare(): void {
		const b64 = getWipBase64();

		const newURL = new URL(router.asPath, getURL());
		newURL.searchParams.set(TILE_STATE_QUERY_PARAM, b64);

		navigator.clipboard.writeText(newURL.toString()).catch(alert);

		setToast({
			delay: 3000,
			text: 'Share URL copied to clipboard.',
			type: 'success',
		});
	}

	function handleCreateNode(): number {
		const id = getNextId(wip.tiles);
		l('Creating new tile with id=%d', id);
		setWip({
			...wip,
			tiles: {
				...wip.tiles,
				[id]: { type: 'PRESHIPPED', id: 'google' },
			},
		});

		// Return the new tile id.
		return id;
	}

	return (
		<>
			<Nav
				center={
					<>
						<Tooltip
							text="Help tutorials coming soon!"
							placement="bottom"
							type="dark"
						>
							<Info size={16} />
						</Tooltip>

						<Spacer w={0.5} />
						<Text small>
							Use this page to customize your search engines like
							a tiling window manager.
						</Text>
					</>
				}
				right={
					<>
						<Link href={passQueryParams(router.asPath, '/search')}>
							<Button auto icon={<X />} scale={0.25} type="abort">
								Cancel
							</Button>
						</Link>
						<Spacer w={0.25} />
						<Button
							auto
							icon={<RotateCcw />}
							onClick={() => setWip(initialTileState)}
							scale={0.25}
						>
							Undo all
						</Button>
						<Spacer w={0.25} />
						<Select
							placeholder="Choose from gallery"
							onChange={(v) => setWip(gallery[v as string])}
							scale={0.4}
						>
							{Object.keys(gallery).map((o) => (
								<Select.Option key={o} value={o}>
									{gallery[o].name}
								</Select.Option>
							))}
						</Select>
						<Spacer w={0.25} />
						<ButtonDropdown scale={0.25} type="success">
							<ButtonDropdown.Item main onClick={handlePreview}>
								Preview
							</ButtonDropdown.Item>
							<ButtonDropdown.Item
								onClick={handleSave}
								type="success"
							>
								Save as default
							</ButtonDropdown.Item>
							<ButtonDropdown.Item
								onClick={handleShare}
								type="success"
							>
								Share
							</ButtonDropdown.Item>
						</ButtonDropdown>
						<Spacer w={1} />
					</>
				}
			/>
			<Mosaic<number>
				onChange={(newNode) => {
					if (newNode) {
						const cleaned = cleanWip(newNode, wip);
						setWip(cleaned);
					}
				}}
				renderTile={(id, path) => {
					const tile = wip.tiles[id];
					const searchEngine = getSearchEngine(tile);

					return (
						<MosaicWindow<number>
							createNode={handleCreateNode}
							path={path}
							toolbarControls={
								<>
									<SplitButton />
									<RemoveButton />
								</>
							}
							title={getTileName(tile)}
						>
							<Spacer />
							<Card className="margin-auto" width="400px">
								<Image
									height="200px"
									src={
										searchEngine.image ||
										'https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png'
									}
									draggable={false}
								/>

								<Description
									title={searchEngine.name}
									content={searchEngine.description}
								/>

								<Card.Footer>
									<Text type="secondary" small>
										Choose another:
									</Text>
									<Select
										onChange={handleChangeTile(id)}
										placeholder="Choose one"
										value={
											isPreshippedTile(tile)
												? tile.id
												: 'custom'
										}
										width="100%"
									>
										{Object.keys(
											preShippedSearchEngines
										).map((k) => (
											<Select.Option key={k} value={k}>
												{
													preShippedSearchEngines[
														k as keyof typeof preShippedSearchEngines
													].name
												}
											</Select.Option>
										))}
										<Select.Option disabled value="custom">
											Custom Search Engine (Coming
											soon...)
										</Select.Option>
									</Select>
								</Card.Footer>
							</Card>
						</MosaicWindow>
					);
				}}
				value={wip.currentNode}
			/>
		</>
	);
};

/**
 * Retrieve the id of the next tile.
 *
 * The algorithm is: get whatever smallest unsued integer.
 */
function getNextId(tiles: TileMap): number {
	let id = 0;
	while (tiles[id]) {
		id++;
	}

	return id;
}

/**
 * Parse all nodes in the WIP state, and remove all unnecessary tiles.
 */
function cleanWip(node: MosaicNode<number>, tiles: TileState): TileState {
	const leaves = getLeaves(node);

	// Delete all tiles that are not leaves in the tree.
	const remainingTiles = leaves.reduce((acc, leafId) => {
		acc[leafId] = tiles.tiles[leafId];
		return acc;
	}, {} as TileMap);

	if (Object.keys(tiles).length !== leaves.length) {
		l('Removed 1 node.');
	}

	return {
		...tiles,
		currentNode: node,
		tiles: remainingTiles,
	};
}
