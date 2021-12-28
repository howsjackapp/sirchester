import { Modal } from '@geist-ui/react';
import { ArrowLeft } from '@geist-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { passQueryParams } from '../util';

// Width below which we show a modal.
const MIN_WIN_WIDTH = 1024;

export function SizeGuard(): React.ReactElement {
	const router = useRouter();
	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		setWindowWidth(window.innerWidth);

		window.addEventListener('resize', () => {
			setWindowWidth(window.innerWidth);
		});
	}, []);

	const isTooSmall = !!windowWidth && windowWidth < MIN_WIN_WIDTH;

	return (
		<Modal disableBackdropClick visible={isTooSmall}>
			<Modal.Title>Screen too small!</Modal.Title>
			<Modal.Subtitle>
				Sir Chester is not available on small screens
			</Modal.Subtitle>
			<Modal.Content>
				<p>
					Sir Chester uses the free screen space to show addtional
					information. As such, it doesn&apos;t render well on small
					screens.
				</p>
				<p>We recommend you to try again on a Desktop screen.</p>
			</Modal.Content>
			<Modal.Action icon={<ArrowLeft />}>
				<Link
					href={passQueryParams(router.asPath, '/', undefined, ['q'])}
				>
					Back to Homepage
				</Link>
			</Modal.Action>
		</Modal>
	);
}
