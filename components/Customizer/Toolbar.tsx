import {
	Button,
	ButtonDropdown,
	Select,
	Spacer,
	Text,
	Tooltip,
	useToasts,
} from '@geist-ui/react';
import { Eye, Info, RotateCcw, Save, Share2, X } from '@geist-ui/react-icons';
import { setCookies } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

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
	const [loading, setLoading] = useState(false);
	const { q } = router.query;

	function handlePreview(): void {
		setLoading(true);

		router
			.push(
				passQueryParams(router.asPath, '/search', [
					['q', (q as string | undefined) || 'test'],
					[TILE_STATE_QUERY_PARAM, getWipBase64(wip)],
				])
			)
			.then(() =>
				setToast({
					actions: [
						{
							handler: (_e, cancel) => {
								router
									.push(
										passQueryParams(
											router.asPath,
											'/customize',
											[
												[
													TILE_STATE_QUERY_PARAM,
													getWipBase64(wip),
												],
											]
										)
									)
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
				})
			)
			.catch(alert);
	}

	function handleSave(): void {
		setLoading(true);
		saveCookies(wip);

		router
			.push(
				passQueryParams(router.asPath, q ? '/search' : '/', undefined, [
					TILE_STATE_QUERY_PARAM,
				])
			)
			.then(() =>
				setToast({
					delay: 3000,
					text: 'Successfully saved new configuration.',
					type: 'success',
				})
			)
			.catch(alert);
	}

	function handleShare(): void {
		const b64 = getWipBase64(wip);

		const newURL = new URL(router.asPath, getURL());
		newURL.searchParams.set(TILE_STATE_QUERY_PARAM, b64);

		navigator.clipboard
			.writeText(newURL.toString())
			.then(() =>
				setToast({
					delay: 3000,
					text: 'Share URL copied to clipboard.',
					type: 'success',
				})
			)
			.catch(alert);
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
					<ButtonDropdown
						loading={loading}
						scale={0.25}
						type="success"
					>
						<ButtonDropdown.Item main onClick={handlePreview}>
							<Eye size={14} /> <Spacer w={0.5} /> Preview
						</ButtonDropdown.Item>
						<ButtonDropdown.Item
							onClick={handleSave}
							type="success"
						>
							<Save size={14} /> <Spacer w={0.5} /> Save as
							default
						</ButtonDropdown.Item>
						<ButtonDropdown.Item
							onClick={handleShare}
							type="success"
						>
							<Share2 size={14} /> <Spacer w={0.5} /> Share
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
