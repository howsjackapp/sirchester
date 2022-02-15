import { Popover } from '@geist-ui/react';
import type { TooltipOnVisibleChange } from '@geist-ui/react/dist/tooltip/tooltip';
import { QuestionCircle } from '@geist-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { passQueryParams } from '../util';
import styles from './Fab.module.css';

interface FabProps {
	// The `?q=` query param.
	q: string;
	open: boolean;
	onOpen: TooltipOnVisibleChange;
}

export function Fab({ onOpen, open, q }: FabProps): React.ReactElement {
	const router = useRouter();
	return (
		<Popover
			className={styles.fab}
			content={popoverContentWithQ(router.asPath, q)}
			onVisibleChange={onOpen}
			placement="topStart"
			visible={open}
		>
			<QuestionCircle />
		</Popover>
	);
}

function popoverContentWithQ(
	path: string,
	q: string
): () => React.ReactElement {
	const popoverContent = () => (
		<>
			<Popover.Item>
				<Link href={passQueryParams(path, '/', undefined, ['q'])}>
					Homepage
				</Link>
			</Popover.Item>
			<Popover.Item>
				<Link href={passQueryParams(path, '/gallery', [['q', q]])}>
					Change settings
				</Link>
			</Popover.Item>
		</>
	);

	return popoverContent;
}
