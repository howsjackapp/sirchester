import {
	Card,
	Description,
	Image,
	Select,
	Spacer,
	Text,
} from '@geist-ui/react';
import debug from 'debug';
import React, { FC } from 'react';
import {
	getLeaves,
	Mosaic,
	MosaicNode,
	MosaicWindow,
	RemoveButton,
	SplitButton,
} from 'react-mosaic-component';

import {
	getSearchEngine,
	getTileName,
	isPreshippedTile,
	preShippedSearchEngines,
	TileMap,
	TileState,
} from '../../util';

const l = debug('sirchester:customize');

interface MosaicContainerProps {
	setWip: (wip: TileState) => void;
	wip: TileState;
}

export const MosaicContainer: FC<MosaicContainerProps> = ({ setWip, wip }) => {
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
									{Object.keys(preShippedSearchEngines).map(
										(k) => (
											<Select.Option key={k} value={k}>
												{
													preShippedSearchEngines[
														k as keyof typeof preShippedSearchEngines
													].name
												}
											</Select.Option>
										)
									)}
									<Select.Option disabled value="custom">
										Custom Search Engine (Coming soon...)
									</Select.Option>
								</Select>
							</Card.Footer>
						</Card>
					</MosaicWindow>
				);
			}}
			value={wip.currentNode}
		/>
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
