// This file is copy-pasted from:
// https://github.com/springload/react-iframe-click/blob/eff8705b0c96f3453c1f3648a00808e85ab3bf41/src/index.tsx
//
// License: MIT
// Author: @springload
import React, { useCallback, useEffect, useRef } from 'react';

interface IframeProps
	extends React.DetailedHTMLProps<
		React.IframeHTMLAttributes<HTMLIFrameElement>,
		HTMLIFrameElement
	> {
	onInferredLoad?: (iframe: HTMLIFrameElement) => void;
	onInferredClick?: (iframe: HTMLIFrameElement) => void;
}

export function Iframe({
	onInferredClick,
	onInferredLoad,
	onLoad,
	...props
}: IframeProps): React.ReactElement {
	const iframeRef = useRef<null | HTMLIFrameElement>(null);

	const iframeCallbackRef = useCallback(
		(node: null | HTMLIFrameElement): void => {
			iframeRef.current = node;
		},
		[]
	);

	useEffect(() => {
		const onBlur = () => {
			if (
				document.activeElement &&
				document.activeElement.nodeName.toLowerCase() === 'iframe' &&
				iframeRef.current &&
				iframeRef.current === document.activeElement
			) {
				// infer a click event
				onInferredClick && onInferredClick(iframeRef.current);
			}
		};

		window.addEventListener('blur', onBlur);

		return () => {
			window.removeEventListener('blur', onBlur);
		};
	}, [onInferredClick]);

	return (
		<iframe
			{...props}
			onLoad={(...args) => {
				iframeRef.current &&
					onInferredLoad &&
					onInferredLoad(iframeRef.current);
				onLoad && onLoad(...args);
			}}
			ref={iframeCallbackRef}
		/>
	);
}
