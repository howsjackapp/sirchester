import { Select } from '@geist-ui/react';
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
			console.log(v);
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
			<div>
				<button onClick={backToSearch}>Cancel</button>
				<button onClick={handleClick}>Save</button>
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
						<>
							<Select
								onChange={handleChangeTile(id)}
								placeholder="Choose one"
								value={
									isPreshippedTile(wip[id])
										? wip[id].id
										: 'custom'
								}
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
							<code>{JSON.stringify(wip, undefined, '\t')}</code>
						</>
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
