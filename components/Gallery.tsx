import {
	Button,
	Card,
	Grid,
	GridProps,
	Text,
	Textarea,
	useToasts,
} from '@geist-ui/react';
import { Eye } from '@geist-ui/react-icons';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import {
	gallery,
	getBase64,
	passQueryParams,
	TILE_STATE_QUERY_PARAM,
	TileState,
} from '../util';
import { MosaicContainer } from './Customizer/MosaicContainer';
import styles from './Gallery.module.css';

export function Gallery(): React.ReactElement {
	return (
		<Grid.Container gap={3} justify="center">
			{Object.keys(gallery).map((k) => {
				const tileState = gallery[k];

				return <GalleryCard key={k} tileState={tileState} />;
			})}
			<GalleryCard customizable tileState={gallery.ddgTrio} />
		</Grid.Container>
	);
}

interface GalleryCardProps extends GridProps {
	customizable?: boolean;
	tileState: TileState;
}

export function GalleryCard({
	customizable,
	tileState,
	...rest
}: GalleryCardProps): React.ReactElement {
	const router = useRouter();
	const { q } = router.query;
	const [, setToast] = useToasts();
	const [wip, setWip] = useState(JSON.stringify(tileState, undefined, '  '));

	function handlePreview(tileState: TileState) {
		return function () {
			router
				.push(
					passQueryParams(router.asPath, '/search', [
						// TODO Factorize this code with Toolbar.tsx
						['q', (q as string | undefined) || 'test'],
						[TILE_STATE_QUERY_PARAM, getBase64(tileState)],
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
												'/gallery',
												undefined,
												[TILE_STATE_QUERY_PARAM]
											)
										)
										.catch(alert);
									cancel();
								},
								name: 'Back',
							},
							{
								handler: (_e, cancel) => {
									cancel();
								},
								name: 'Save as default',
								passive: true,
							},
						],
						delay: 10000,
						text: 'Preview mode.',
					})
				)
				.catch(alert);
		};
	}

	return (
		<Grid xs={24} sm={12} lg={8} {...rest}>
			<Card>
				<Text h4>
					{customizable ? 'Customize your own' : tileState.name}
				</Text>
				<div className={styles.mosaic}>
					{customizable ? (
						<Textarea
							height="100%"
							onChange={(e) => setWip(e.target.value)}
							value={wip}
						/>
					) : (
						<MosaicContainer tileState={tileState} />
					)}
				</div>

				<Text type="secondary" small>
					{customizable
						? 'This is an advanced feature.'
						: `By @${tileState.author}. ${tileState.description}`}
				</Text>
				<Card.Footer>
					<Button
						icon={<Eye />}
						onClick={handlePreview(
							customizable ? JSON.parse(wip) : tileState
						)}
						type="success"
					>
						Preview
					</Button>
				</Card.Footer>
			</Card>
		</Grid>
	);
}
