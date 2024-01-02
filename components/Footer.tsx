import { Link, Spacer } from '@geist-ui/react';
import Image from 'next/image';
import React from 'react';

export function Footer(): React.ReactElement {
	return (
		<div className="flex justify-center">
			<footer className="container text-center">
				<p>
					Sir Chester is an open-source website with no ads. Please
					help us with code, feedback or questions{' '}
					<Link
						color
						href="https://github.com/SirChesterApp/webapp"
						icon
						target="_blank"
						rel="noreferrer"
					>
						on Github
					</Link>
					. Our business model is{' '}
					<Link
						color
						href="https://github.com/sponsors/storm1729"
						icon
						target="_blank"
						rel="noreferrer"
					>
						donations
					</Link>
					.
				</p>
				<p>
					Copyright{' '}
					<Link
						color
						href="https://github.com/storm1729"
						icon
						target="_blank"
						rel="noreferrer"
					>
						@storm1729
					</Link>{' '}
					2022.
					<br />
					Moustache logo{' '}
					<Image
						height={24}
						src="/logo/moustache-64.png"
						width={24}
					/>{' '}
					made by{' '}
					<Link
						color
						href="https://www.flaticon.com/authors/gregor-cresnar"
						icon
						target="_blank"
						rel="noreferrer"
					>
						Gregor Cresnar
					</Link>
					.
				</p>
				<a
					href="https://vercel.com?utm_source=SirChesterApp&utm_campaign=oss"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src="/powered-by-vercel.svg" />
				</a>
				<Spacer />
			</footer>
		</div>
	);
}
