import { Modal } from '@geist-ui/react';
import { Home } from '@geist-ui/react-icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// Width below which we show a modal.
const MIN_WIN_WIDTH = 1024;

export function SizeGuard(): React.ReactElement {
	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		window.addEventListener('resize', () => {
			setWindowWidth(window.innerWidth);
		});
	}, []);

	return (
		<Modal disableBackdropClick visible={windowWidth < MIN_WIN_WIDTH}>
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
			<Modal.Action icon={<Home />}>
				<Link href="/">Back to Homepage</Link>
			</Modal.Action>
		</Modal>
	);
}
