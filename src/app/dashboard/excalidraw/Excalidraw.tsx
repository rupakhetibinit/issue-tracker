'use client';
import type {
	ExcalidrawAPIRefValue,
	ExcalidrawProps,
} from '@excalidraw/excalidraw/types/types';
import {
	ForwardRefExoticComponent,
	MemoExoticComponent,
	RefAttributes,
	useEffect,
	useState,
} from 'react';

export default function Excl(props: ExcalidrawProps) {
	const [Excalidraw, setExcalidraw] = useState<MemoExoticComponent<
		ForwardRefExoticComponent<
			ExcalidrawProps & RefAttributes<ExcalidrawAPIRefValue>
		>
	> | null>(null);
	useEffect(() => {
		import('@excalidraw/excalidraw').then((comp) =>
			setExcalidraw(comp.Excalidraw)
		);
	});
	return <>{Excalidraw && <Excalidraw {...props} />}</>;
}
