import {
	Button,
	Card,
	Description,
	Image,
	Link as GLink,
	Select,
	Spacer,
	Text,
	Tooltip,
	useToasts,
} from '@geist-ui/react';
import { Info, RotateCcw, Save, X } from '@geist-ui/react-icons';
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
	isPreshippedTile,
	preShippedSearchEngines,
	TileMap,
	TileState,
} from '../util';

const l = debug('sirchester:customize');

interface CustomizerProps {
	initialTileState: TileState;
}

export const Customizer: FC<CustomizerProps> = ({ initialTileState }) => {
	const router = useRouter();
	const [wip, setWip] = useState(initialTileState); // WIP tileState.
	const [_, setToast] = useToasts();
	const { q } = router.query;

	function backToSearch(): void {
		router.push(q ? `/search?q=${q as string}` : '/').catch(alert);
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

	function handleSave(): void {
		// Set cookie to expire in a far away future,.
		setCookies(COOKIE_TILE_STATE, wip, { expires: new Date('2050-01-01') });
		setToast({
			delay: 3000,
			text: 'Successfully saved new configuration.',
			type: 'success',
		});

		return backToSearch();
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
			<div className="flex space-between">
				<div className="flex align-center flex-grow-no-basis">
					<Spacer w={1} />
					<Link href="/">
						<GLink>
							<Text b small>
								Sir Chester
							</Text>
						</GLink>
					</Link>
				</div>
				<div className="flex align-center">
					<Tooltip
						text="Help tutorials coming soon! Sorry."
						placement="bottom"
						type="dark"
					>
						<Info size={16} />
					</Tooltip>

					<Spacer w={0.5} />
					<Text small>
						Use this page to customize your search engines like a
						tiling window manager.
					</Text>
				</div>
				<div className="flex flex-grow-no-basis justify-end">
					<Button
						auto
						icon={<X />}
						onClick={backToSearch}
						scale={0.25}
						my="0.25rem"
						type="abort"
					>
						Cancel
					</Button>
					<Spacer w={0.25} />
					<Button
						auto
						icon={<RotateCcw />}
						onClick={() => setWip(initialTileState)}
						scale={0.25}
						my="0.25rem"
					>
						Undo all
					</Button>
					<Spacer w={0.25} />
					<Select
						placeholder="Choose from gallery"
						my="0.25rem"
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
					<Button
						auto
						icon={<Save />}
						onClick={handleSave}
						scale={0.25}
						my="0.25rem"
						type="success"
					>
						Save
					</Button>
					<Spacer w={1} />
				</div>
			</div>
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
