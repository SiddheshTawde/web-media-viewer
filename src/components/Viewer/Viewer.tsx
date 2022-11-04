import { FunctionComponent, useState } from "react"
import { useSprings } from "@react-spring/web"
import useMesaure from "react-use-measure"
import { useDrag } from "react-use-gesture"
import clamp from "lodash.clamp"

import ViewerPorps from "../../types/ViewerProps"
import Modal from "../Modal/Modal";
import MediaComponent from "../MediaComponent/MediaComponent"

const Viewer: FunctionComponent<ViewerPorps> = ({ items, galleryTitle }) => {
	const [containerRef, { height, width }] = useMesaure();

	const [current, updateCurrent] = useState(0);
	const [open, toggle] = useState(false); // For Jump-to-Image Modal
	const [props, api] = useSprings(items.length, index => ({ x: index * window.innerWidth, scale: 1, display: 'flex' }), []);

	const gesture = useDrag(({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
		if (active && distance > width / 2) {
			updateCurrent(clamp(current + (xDir > 0 ? -1 : 1), 0, items.length - 1))
			cancel()
		}
		api.start(i => {
			if (i < current - 1 || i > current + 1) return { display: 'none' }
			const x = (i - current) * width + (active ? mx : 0)
			const scale = active ? 1 - distance / width / 2 : 1
			return { x, scale, display: 'flex' }
		})
	});

	const handleNavigation = (targetIndex: number) => {
		updateCurrent(targetIndex);

		api.start((i: number) => {
			if (i < targetIndex - 1 || i > targetIndex + 1) return { display: "none" }
			const x = (i - targetIndex) * width
			const scale = 1
			return { x, scale, display: "flex" }
		})
	};

	const handleJumpToNavigation = (targetIndex: number) => {
		const diff = Math.abs(targetIndex - current);

		for (let i = 0; i <= diff; i++) {
			let newIndex = -1;

			if (targetIndex < current) {
				newIndex = current - i;
			}

			if (targetIndex > current) {
				newIndex = current + i;
			}

			updateCurrent(newIndex);

			api.start((i: number) => {
				if (i < newIndex - 1 || i > newIndex + 1) return { display: "none" }
				const x = (i - newIndex) * width
				const scale = 1
				return { x, scale, display: "flex" }
			})
		}
	};

	return (
		<main ref={containerRef} className="relative bg-white h-full w-full">
			<button className="absolute top-4 left-4 text-sm bg-black/60 hover:bg-black/50 active:bg-black/70 text-gray-50 px-4 py-3 rounded cursor-pointer transition-colors z-10" onClick={() => toggle(true)}>{current + 1} / {items.length}</button>

			<button onClick={() => handleNavigation(current - 1)} disabled={current <= 0} className="absolute top-0 bottom-0 left-4 m-auto bg-black/60 hover:bg-black/50 active:bg-black/70 disabled:bg-gray-300 text-gray-50 rounded p-3 w-fit h-fit transition-colors z-10">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
				</svg>
			</button>

			<button onClick={() => handleNavigation(current + 1)} disabled={current >= items.length - 1} className="absolute top-0 bottom-0 right-4 m-auto bg-black/60 hover:bg-black/50 active:bg-black/70 disabled:bg-gray-300 text-gray-50 rounded p-3 w-fit h-fit transition-colors z-10">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
				</svg>
			</button>

			<Modal items={items} height={height} width={width} open={open} toggle={toggle} galleryTitle={galleryTitle} handleJumpToNavigation={handleJumpToNavigation} />

			<div className="relative flex items-center justify-center w-full h-full overflow-hidden">
				{props.map(({ display, scale, x }, index) =>
					<MediaComponent key={`item-${index + 1}`} display={display} scale={scale} x={x} item={items[index]} gesture={gesture} height={height} width={width} />
				)}
			</div>

		</main>
	)
}

export default Viewer