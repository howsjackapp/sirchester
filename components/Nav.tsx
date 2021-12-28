import { Link as GLink, Spacer, Text } from '@geist-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from './Nav.module.css';

interface NavProps {
	center?: React.ReactElement;
	right?: React.ReactElement;
}

export function Nav({ center, right }: NavProps): React.ReactElement {
	return (
		<div className="flex space-between">
			<div className="flex align-center flex-grow-no-basis">
				<Spacer w={1} />
				<Link href="/">
					<GLink>
						<Image
							className={styles.logo}
							height={16}
							src="/logo/moustache-128.png"
							width={16}
						/>
						<Spacer w={0.2} />
						<Text b small>
							Sir Chester
						</Text>
					</GLink>
				</Link>
			</div>
			<div className="flex align-center">{center}</div>
			<div className="flex flex-grow-no-basis justify-end">{right}</div>
		</div>
	);
}
