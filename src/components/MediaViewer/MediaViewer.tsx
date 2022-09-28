import React, { FunctionComponent, useRef, useState } from 'react'
import useMeasure from "react-use-measure"
import { useDrag } from "@use-gesture/react"
import clamp from "lodash.clamp"
import { useSprings, useTrail, animated } from "@react-spring/web"
import { TiArrowLeftThick, TiArrowRightThick, TiTimes } from "react-icons/ti"

// @ts-ignore - dompurify does not includes type definitions
import DOMPurify from "dompurify"

import DeviceDetect from '../../../utils/detect-device'
import { MediaViewerProps } from '../../types/MediaViewer'
import ItemComponent from '../Item/Item'
import Thumbnail from '../Item/Thumbnail'

import './MediaViewer.css'

const MediaViewer: FunctionComponent<MediaViewerProps> = ({ items = [], theme = 'light', hideControls = false, spinnerSize = 48, swipeDistance, titleStyles, galleryName = '' }) => {
	const isMobile = DeviceDetect();
	const modalref = useRef<HTMLDivElement>(null);
	const [container, { height, width }] = useMeasure();

	const [openOverlay, toggleOverlay] = useState(false);
	const trail = useTrail(items.length, {
		opacity: openOverlay ? 1 : 0,
		x: openOverlay ? 0 : -200,
		from: { opacity: 0, x: -200 },
	});

	const handleJumpToSlide = (index: number) => {
		updateIndex(index);

		api.start(i => {
			if (i < index - 1 || i > index + 1) return { display: "none" }
			const x = (i - index) * width
			const scale = 1
			return { x, scale, display: "flex" }
		});

		toggleOverlay(false);
	};

	const [index, updateIndex] = useState(0);
	const [props, api] = useSprings(items.length, i => ({ x: i * width, scale: width === 0 ? 0 : 1, display: "flex" }), [width])

	const handleSwipeGesture = useDrag(({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
		if (active && distance[0] > (swipeDistance || width / 2)) {
			updateIndex(clamp(index + (xDir > 0 ? -1 : 1), 0, items.length - 1))
			cancel()
		}
		api.start(i => {
			if (i < index - 1 || i > index + 1) return { display: "none" }
			const x = (i - index) * width + (active ? mx : 0)
			const scale = active ? 1 - distance[0] / width / 2 : 1
			return { x, scale, display: "flex" }
		})
	});

	const handleNavigation = (index: number) => {
		updateIndex(index);

		api.start((i: number) => {
			if (i < index - 1 || i > index + 1) return { display: "none" }
			const x = (i - index) * width
			const scale = 1
			return { x, scale, display: "flex" }
		})
	};

	const handleModalOpen = () => {
		toggleOverlay(true);
		modalref.current?.classList.add("fold-in");
	};

	const handleModalClose = () => {
		toggleOverlay(false);
		modalref.current?.classList.add("fold-out");

		setTimeout(() => {
			modalref.current?.classList.remove("fold-in");
			modalref.current?.classList.remove("fold-out");
		}, 1000);
	};

	return (
		<main ref={container} className={`media-viewer__container media-viewer__container-background--${theme}`}>

			{/* Navigation controls -- Start */}
			{index === 0 || isMobile || hideControls ? null :
				<button className="media-viewer__nav-button media-viewer__left-nav" disabled={index === 0} onClick={() => handleNavigation(index - 1)}>
					<TiArrowLeftThick fontSize={24} color={"#FFFFFF"} />
				</button>
			}

			{index === items.length - 1 || isMobile || hideControls ? null :
				<button className="media-viewer__nav-button media-viewer__right-nav" disabled={index === items.length - 1} onClick={() => handleNavigation(index + 1)}>
					<TiArrowRightThick fontSize={24} color={"#FFFFFF"} />
				</button>
			}
			{/* Navigation controls -- End */}

			{/* Main Items - Start */}
			{props.map(({ x, display, scale }, i) =>
				<animated.div key={`item-${i + 1}`} className="media-viewer__item" {...handleSwipeGesture()} style={{ display, x, scale }}>
					<ItemComponent item={items[i]} currentIndex={index} width={width} height={height} spinnerSize={spinnerSize} titleStyles={titleStyles} />
				</animated.div>
			)}
			{/* Main Items - End */}

			{/* Jump-to-Image Section - Start */}
			<button className={`media-viewer__overlay-trigger ${openOverlay ? 'hidden' : ''}`} onClick={handleModalOpen}>
				{items.length === 0 ? "- / -" : (index + 1) + " / " + items.length}
			</button>

			<div ref={modalref} className="media-viewer__modal-container">
				<header className='media-viewer__modal-header'>
					<h3 style={{ margin: 0, color: "#FFFFFF" }}>{galleryName}</h3>
					<TiTimes fontSize={24} color={"#FFFFFF"} style={{ cursor: "pointer" }} onClick={handleModalClose} />
				</header>

				<div className="media-viewer__modal-thumbnail-container">
					{trail.map(({ opacity, x }, i) =>
						<animated.div key={i} className="media-viewer__modal-thumbnail" style={{ opacity, x }} onClick={() => { handleJumpToSlide(i); handleModalClose(); }}>
							<div className="media-viewer__modal-title"><h4>{i + 1}</h4></div>
							<div style={{ display: "flex", alignItems: "center", height: 100, width: 100 }}>
								<Thumbnail item={items[i]} />
							</div>
							{items[i].title ?
								<div className="media-viewer__modal-title" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(items[i].title, { USE_PROFILES: { html: true } }) || "" }} />
								: null
							}
						</animated.div>
					)}
				</div>
			</div>
			{/* Jump-to-Image Section - End */}

		</main >
	)
}

export default MediaViewer