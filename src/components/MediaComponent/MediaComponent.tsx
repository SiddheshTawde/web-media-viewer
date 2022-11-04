import { FunctionComponent, useMemo, useState } from "react"
import useMeasure from "react-use-measure"
import { animated } from "@react-spring/web"
import DOMPurify from 'dompurify';

import Spinner from "./Spinner"
import parseURL from "../../utils/parse-url";
import MediaComponentProps from "../../types/MediaComponentProps"


const MediaComponent: FunctionComponent<MediaComponentProps> = ({ display, scale, x, item, gesture, height, width }) => {
	const [titleRef, rect] = useMeasure();

	const parsedItem = useMemo(() => parseURL(item.url), []);
	const [loading, toggle] = useState(true);

	if (item.type === "image" || parsedItem.category === 'image') {
		return (
			<animated.div {...gesture()} style={{ display, scale, x, boxShadow: "0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)" }} className="absolute items-center justify-center h-fit w-fit select-none z-0">
				{loading ?
					<div className="bg-black/40 backdrop-blur-sm w-full h-full flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 m-auto">
						<Spinner />
					</div>
					: null
				}

				{loading ? null :
					<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.title || "") }} className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-4" />
				}

				{item.type === "image" || parsedItem.category === 'image' ?
					<img src={item.url} draggable={false} className="select-none" style={{ maxHeight: height, maxWidth: width }} onLoad={() => toggle(false)} />
					: null
				}
			</animated.div>
		)
	}

	if (parsedItem.category === 'video') {
		if (parsedItem.type === 'youtube') {
			return (
				<animated.div style={{ display, scale, x }} className="absolute flex-col items-center justify-center h-fit w-fit select-none shadow-2xl z-0">
					<iframe
						src={parsedItem.url}
						width={width}
						height={height - rect.height}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen={true}
						onLoad={() => toggle(false)}
					/>

					{loading ? null :
						<div ref={titleRef} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.title || "") }} className="w-full bg-black/40 text-white p-4" />
					}
				</animated.div>
			)
		}

		if (parsedItem.type === 'vimeo') {
			return (
				<animated.div style={{ display, scale, x }} className="absolute flex-col items-center justify-center h-fit w-fit select-none shadow-2xl z-0">
					<iframe
						src={parsedItem.url}
						width={width}
						height={height - rect.height}
						frameBorder="0"
						allow="autoplay; fullscreen; picture-in-picture"
						allowFullScreen={true}
						onLoad={() => toggle(false)}
					/>

					{loading ? null :
						<div ref={titleRef} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.title || "") }} className="w-full bg-black/40 text-white p-4" />
					}
				</animated.div>
			)
		}

		return (
			<animated.div style={{ display, scale, x }} className="absolute flex-col items-center justify-center h-fit w-fit select-none shadow-2xl z-0">
				<video
					width={width}
					height={height - rect.height}
					controls={true}
					onLoadedData={() => toggle(false)}
				>
					<source src={parsedItem.url} />
				</video>

				{loading ? null :
					<div ref={titleRef} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.title || "") }} className="w-full bg-black/40 text-white p-4" />
				}
			</animated.div >
		)
	}

	return (
		<div>unsupported file</div>
	)
}

export default MediaComponent