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
import styles from './MosaicContainer.module.css';

const l = debug('sirchester:customize');

interface MosaicContainerProps {
	/**
	 * Set to true to make the mosaic customizable.
	 */
	setWip?: (wip: TileState) => void;
	tileState: TileState;
}

export const MosaicContainer: FC<MosaicContainerProps> = ({
	setWip,
	tileState,
}) => {
	function handleChangeTile(leafId: number) {
		return function (newValue: string | string[]): void {
			if (!setWip) {
				throw new Error('setWip must be set for handleChangeTile.');
			}

			const v = newValue as keyof typeof preShippedSearchEngines;
			if (preShippedSearchEngines[v]) {
				setWip({
					...tileState,
					tiles: {
						...tileState?.tiles,
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
		if (!setWip) {
			throw new Error('setWip must be set for handleCreateNode.');
		}

		const id = getNextId(tileState.tiles);
		l('Creating new tile with id=%d', id);
		setWip({
			...tileState,
			tiles: {
				...tileState.tiles,
				[id]: { type: 'PRESHIPPED', id: 'google' },
			},
		});

		// Return the new tile id.
		return id;
	}

	return (
		<Mosaic<number>
			onChange={
				setWip &&
				((newNode) => {
					if (newNode) {
						const cleaned = cleanWip(newNode, tileState);
						setWip(cleaned);
					}
				})
			}
			renderTile={(id, path) => {
				const tile = tileState.tiles[id];
				const searchEngine = getSearchEngine(tile);

				return (
					<MosaicWindow<number>
						createNode={setWip && handleCreateNode}
						draggable={!!setWip}
						path={path}
						toolbarControls={
							setWip ? (
								<>
									<SplitButton />
									<RemoveButton />
								</>
							) : (
								<></>
							)
						}
						title={getTileName(tile)}
					>
						<Card height="100%" width="100%">
							<div className={styles.image}>
								<Image
									src={searchEngine.image}
									draggable={false}
								/>
							</div>

							<Spacer h={1} />

							<Description
								title={searchEngine.name}
								content={`${searchEngine.description}${
									tile.append
										? ` Append "${tile.append}".`
										: ''
								}`}
							/>

							{setWip && (
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
							)}
						</Card>
					</MosaicWindow>
				);
			}}
			resize={setWip ? undefined : 'DISABLED'}
			value={tileState.currentNode}
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
