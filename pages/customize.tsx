import {
	Button,
	Card,
	Description,
	Image,
	Select,
	Spacer,
	Text,
} from '@geist-ui/react';
import { Save, X } from '@geist-ui/react-icons';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
	Mosaic,
	MosaicWindow,
	RemoveButton,
	SplitButton,
} from 'react-mosaic-component';

import { useTileState } from '../util/context';
import {
	getSearchEngine,
	getTileName,
	isPreshippedTile,
	preShippedTiles,
	TileMap,
} from '../util/tiles';

const Customize: NextPage = () => {
	const router = useRouter();
	const tileState = useTileState();
	const [wip, setWip] = useState(tileState.tiles); // WIP tiles.
	const { q } = router.query;

	function backToSearch(): void {
		router.push(q ? `/search?q=${q as string}` : '/').catch(alert);
	}

	function handleChangeTile(tileId: number) {
		return function (newValue: string | string[]): void {
			const v = newValue as keyof typeof preShippedTiles;
			if (preShippedTiles[v]) {
				setWip({
					...wip,
					[tileId]: { type: 'PRESHIPPED', id: v },
				});
			} else {
				alert(
					'Custom search engines are not supported yet. See issue TODO'
				);
			}
		};
	}

	function handleClick(): void {
		return backToSearch();
	}

	function handleCreateNode(): number {
		const id = getNextId(wip);

		setWip({
			...wip,
			[id]: { type: 'PRESHIPPED', id: 'google' },
		});

		// Return the new tile id.
		return id;
	}

	function handleRemoveNode(tileId: number): void {
		const copy: TileMap = { ...wip };
		delete copy[tileId];

		setWip(copy);
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
					>
						Cancel
					</Button>
					<Button
						auto
						icon={<Save />}
						onClick={handleClick}
						scale={0.25}
						ml="0.25rem"
						my="0.25rem"
						type="success"
					>
						Save
					</Button>
					<Spacer w={1} />
				</div>
			</div>
			<Mosaic<number>
				renderTile={(id, path) => (
					<MosaicWindow<number>
						createNode={handleCreateNode}
						path={path}
						toolbarControls={
							<>
								<SplitButton />
								<RemoveButton
									onClick={() => handleRemoveNode(id)}
								/>
							</>
						}
						title={getTileName(wip[id])}
					>
						<Card className="margin-auto" width="400px">
							<Image
								height="200px"
								src={
									getSearchEngine(wip[id]).image ||
									'https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png'
								}
								draggable={false}
							/>

							<Description
								title={getSearchEngine(wip[id]).name}
								content={getSearchEngine(wip[id]).description}
							/>

							<Card.Footer>
								<Text type="secondary" small>
									Choose another:
								</Text>
								<Select
									onChange={handleChangeTile(id)}
									placeholder="Choose one"
									value={
										isPreshippedTile(wip[id])
											? wip[id].id
											: 'custom'
									}
									width="100%"
								>
									{Object.keys(preShippedTiles).map((k) => (
										<Select.Option key={k} value={k}>
											{
												preShippedTiles[
													k as keyof typeof preShippedTiles
												].name
											}
										</Select.Option>
									))}
									<Select.Option disabled value="custom">
										Custom Search Engine (Coming soon...)
									</Select.Option>
								</Select>
							</Card.Footer>
						</Card>
					</MosaicWindow>
				)}
				initialValue={tileState.currentNode}
			/>
		</>
	);
};

export default Customize;

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
