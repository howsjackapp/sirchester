import {
	Button,
	ButtonDropdown,
	Select,
	Spacer,
	Text,
	Tooltip,
	useToasts,
} from '@geist-ui/react';
import { Info, RotateCcw, X } from '@geist-ui/react-icons';
import { setCookies } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import {
	COOKIE_TILE_STATE,
	gallery,
	getURL,
	passQueryParams,
	TILE_STATE_QUERY_PARAM,
	TileState,
} from '../../util';
import { Nav } from '../Nav';

interface ToolbarProps {
	initialTileState: TileState;
	setWip: (wip: TileState) => void;
	wip: TileState;
}

export function Toolbar({
	initialTileState,
	setWip,
	wip,
}: ToolbarProps): React.ReactElement {
	const router = useRouter();
	const [, setToast] = useToasts();
	const { q } = router.query;

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
			delay: 10000,
			text: 'Previewing new configuration.',
		});

		router
			.push(
				passQueryParams(router.asPath, q ? '/search' : '/', [
					[TILE_STATE_QUERY_PARAM, getWipBase64(wip)],
				])
			)
			.catch(alert);
	}

	function handleSave(): void {
		saveCookies(wip);
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
		const b64 = getWipBase64(wip);

		const newURL = new URL(router.asPath, getURL());
		newURL.searchParams.set(TILE_STATE_QUERY_PARAM, b64);

		navigator.clipboard.writeText(newURL.toString()).catch(alert);

		setToast({
			delay: 3000,
			text: 'Share URL copied to clipboard.',
			type: 'success',
		});
	}

	return (
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
						Use this page to customize your search engines like a
						tiling window manager.
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
	);
}

// Save current tile state to cookies.
function saveCookies(tileState: TileState): void {
	// Set cookie to expire in a far away future,.
	setCookies(COOKIE_TILE_STATE, tileState, {
		expires: new Date('2050-01-01'),
	});
}

// Get the base64 encoding of the current  tile state.
function getWipBase64(tileState: TileState): string {
	return Buffer.from(JSON.stringify(tileState)).toString('base64');
}
