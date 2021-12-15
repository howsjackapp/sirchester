import {
	Button,
	Card,
	Description,
	Image,
	Select,
	Spacer,
	Text,
	useToasts,
} from '@geist-ui/react';
import { Columns, RotateCcw, Save, X } from '@geist-ui/react-icons';
import debug from 'debug';
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
	defaultTiles,
	getSearchEngine,
	getTileName,
	isPreshippedTile,
	preShippedTiles,
	TileMap,
	TileState,
} from '../util/tiles';

const l = debug('multisearch:customize');

interface CustomizerProps {
	initialTileState: TileState;
	onSetTileState: (ts: TileState) => void;
}

export const Customizer: FC<CustomizerProps> = ({
	initialTileState,
	onSetTileState,
}) => {
	const router = useRouter();
	const [wip, setWip] = useState(initialTileState); // WIP tileState.
	const [_, setToast] = useToasts();
	const { q } = router.query;

	function backToSearch(): void {
		router.push(q ? `/search?q=${q as string}` : '/').catch(alert);
	}

	function handleChangeTile(leafId: number) {
		return function (newValue: string | string[]): void {
			const v = newValue as keyof typeof preShippedTiles;
			if (preShippedTiles[v]) {
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
		onSetTileState(wip);
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
				<div className="flex align-center">
					<Spacer w={1} />
					<Text small>
						Use this page to customize your search engines.
					</Text>
				</div>
				<div className="flex">
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
					<Button
						auto
						icon={<Columns />}
						onClick={() => setWip(defaultTiles)}
						scale={0.25}
						my="0.25rem"
					>
						Back to default
					</Button>
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
					<Spacer w={0.25} />
				</div>
			</div>
			<Mosaic<number>
				onChange={(newNode) => {
					if (newNode) {
						const cleaned = cleanWip(newNode, wip.tiles);
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
										{Object.keys(preShippedTiles).map(
											(k) => (
												<Select.Option
													key={k}
													value={k}
												>
													{
														preShippedTiles[
															k as keyof typeof preShippedTiles
														].name
													}
												</Select.Option>
											)
										)}
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
function cleanWip(node: MosaicNode<number>, tiles: TileMap): TileState {
	const leaves = getLeaves(node);

	// Delete all tiles that are not leaves in the tree.
	const remainingTiles = leaves.reduce((acc, leafId) => {
		acc[leafId] = tiles[leafId];
		return acc;
	}, {} as TileMap);

	if (Object.keys(tiles).length !== leaves.length) {
		l('Removed 1 node.');
	}

	return {
		currentNode: node,
		tiles: remainingTiles,
	};
}
