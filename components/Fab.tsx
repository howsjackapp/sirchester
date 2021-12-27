import { Popover } from '@geist-ui/react';
import type { TooltipOnVisibleChange } from '@geist-ui/react/dist/tooltip/tooltip';
import { QuestionCircle } from '@geist-ui/react-icons';
import Link from 'next/link';
import React from 'react';

import styles from './Fab.module.css';

interface FabProps {
	// The `?q=` query param.
	q: string;
	open: boolean;
	onOpen: TooltipOnVisibleChange;
}

export function Fab({ onOpen, open, q }: FabProps): React.ReactElement {
	return (
		<Popover
			className={styles.fab}
			content={popoverContentWithQ(q)}
			onVisibleChange={onOpen}
			placement="topStart"
			visible={open}
		>
			<QuestionCircle />
		</Popover>
	);
}

function popoverContentWithQ(q: string): () => React.ReactElement {
	const popoverContent = () => (
		<>
			<Popover.Item title>Sir Chester</Popover.Item>
			<Popover.Item>
				<Link href="/">Homepage</Link>
			</Popover.Item>
			<Popover.Item>
				<Link href={`/customize?q=${q}`}>Customize search</Link>
			</Popover.Item>
		</>
	);

	return popoverContent;
}
