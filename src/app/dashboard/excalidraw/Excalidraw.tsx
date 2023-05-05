'use client';
import { Excalidraw } from '@excalidraw/excalidraw';
import type { ExcalidrawProps } from '@excalidraw/excalidraw/types/types';

export default function Excl(props: ExcalidrawProps) {
	return <Excalidraw {...props} />;
}
