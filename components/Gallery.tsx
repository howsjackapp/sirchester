import {
	Button,
	Card,
	Grid,
	GridProps,
	Text,
	useToasts,
} from '@geist-ui/react';
import { Eye } from '@geist-ui/react-icons';
import { useRouter } from 'next/router';
import React from 'react';

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
		</Grid.Container>
	);
}

interface GalleryCardProps extends GridProps {
	tileState: TileState;
}

export function GalleryCard({
	tileState,
	...rest
}: GalleryCardProps): React.ReactElement {
	const router = useRouter();
	const { q } = router.query;
	const [, setToast] = useToasts();

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
				<Text h4>{tileState.name}</Text>
				<div className={styles.mosaic}>
					<MosaicContainer tileState={tileState} />
				</div>

				<Text type="secondary" small>
					By @{tileState.author}. {tileState.description}
				</Text>
				<Card.Footer>
					<Button
						icon={<Eye />}
						onClick={handlePreview(tileState)}
						type="success"
					>
						Preview
					</Button>
				</Card.Footer>
			</Card>
		</Grid>
	);
}
