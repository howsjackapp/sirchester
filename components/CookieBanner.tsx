import { useToasts } from '@geist-ui/react';
import { Modal } from '@geist-ui/react';
import { ArrowLeft } from '@geist-ui/react-icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const LS_ACCEPT_COOKIE_KEY = 'sirchester_accept_cookie';
const LS_ACCEPT_COOKIE_VALUE = 'true'; // LocalStorage value when cookie accepted.

interface CookieBannerProps {
	// If true, then show a modal that says the app can't be used if cookies
	// haven't been accepted.
	force?: boolean;
}

export function CookieBanner({
	force,
}: CookieBannerProps): React.ReactElement | null {
	const [, setToast] = useToasts();
	const [showModal, setShowModal] = useState<boolean>(false);

	function acceptCookie() {
		localStorage.setItem(LS_ACCEPT_COOKIE_KEY, LS_ACCEPT_COOKIE_VALUE);
		setShowModal(false);
	}

	useEffect(() => {
		const lsAccepted = localStorage.getItem(LS_ACCEPT_COOKIE_KEY);

		if (lsAccepted !== LS_ACCEPT_COOKIE_VALUE) {
			setShowModal(true);
			setToast({
				text: (
					<span>
						Sir Chester only uses one cookie, and not to
						<br />
						track you. <Link href="/faq">Read more</Link>.
					</span>
				),
				actions: [
					{
						name: 'Accept',
						handler: (_e, cancel) => {
							acceptCookie();
							cancel();
						},
					},
				],
				delay: 999999999,
			});
		}
	}, []);

	return force && showModal ? (
		<Modal disableBackdropClick visible>
			<Modal.Title>Cookie must be accepted</Modal.Title>
			<Modal.Subtitle>
				Sir Chester doesn&apos; work without cookies
			</Modal.Subtitle>
			<Modal.Content>
				<p>
					Sir Chester only uses one cookie, to store your search
					engine preferences. It <strong>DOES NOT</strong> track any
					other usage or personal info.{' '}
					<Link href="/faq">Read more</Link>.
				</p>
			</Modal.Content>
			<Modal.Action icon={<ArrowLeft />} passive>
				<Link href="/">Back to Homepage</Link>
			</Modal.Action>
		</Modal>
	) : null;
}
