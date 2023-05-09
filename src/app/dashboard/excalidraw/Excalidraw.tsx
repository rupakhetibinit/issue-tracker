'use client';
import { MainMenu, exportToBlob } from '@excalidraw/excalidraw';
import type {
	ExcalidrawAPIRefValue,
	ExcalidrawProps,
} from '@excalidraw/excalidraw/types/types';
import React from 'react';
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
	const [excAPI, setExcAPI] = useState<ExcalidrawAPIRefValue | null>(null);

	useEffect(() => {
		import('@excalidraw/excalidraw').then((comp) =>
			setExcalidraw(comp.Excalidraw)
		);
	}),
		[];
	if (!Excalidraw) return <div>Loading Excalidraw. Please be patient...</div>;
	return (
		<>
			{Excalidraw && (
				<Excalidraw ref={(api) => setExcAPI(api)} {...props}>
					{/* <MainMenu>
						<MainMenu.Item
							onSelect={async () => {
								if (!excAPI?.ready) {
									return;
								}
								const elements = excAPI.getSceneElements();
								const appState = excAPI.getAppState();
								const blob = await exportToBlob({
									elements: elements,
									appState: {
										...appState,
										exportWithDarkMode: false,
									},
									files: excAPI.getFiles(),
									getDimensions: () => {
										return {
											width: window.outerWidth,
											height: window.outerHeight,
										};
									},
								});
								console.log(blob);

								const formData = new FormData();
								formData.append('image', blob);
								await fetch('http://localhost:3000/api/save-image', {
									method: 'POST',
									body: formData,
									credentials: 'include',
								});
							}}>
							Export
						</MainMenu.Item>
					</MainMenu> */}
				</Excalidraw>
			)}
		</>
	);
}
