import React, { CSSProperties, Fragment, FunctionComponent, useMemo, useState } from 'react'
import Spinner from "../../icons/Spinner/Spinner"
import Item from '../../types/Item'
// @ts-ignore - dompurify does not includes type definitions
import DOMPurify from "dompurify"
import LoadingError from '../LoadingError/LoadingError'
import parseURL from '../../../utils/parse-url'

interface ItemComponentProps {
	item: Item;
	width: number;
	height: number;
	spinnerSize: number;
	titleStyles?: CSSProperties;
	currentIndex: number;
}

const ItemComponent: FunctionComponent<ItemComponentProps> = ({ item, width, height, spinnerSize, titleStyles, currentIndex }) => {
	const [error, toggleError] = useState(false);
	const [loading, toggleLoading] = useState(true);
	const parsedItem = useMemo(() => parseURL(item.url), []);

	if (error) {
		return (
			<LoadingError>
				<button onClick={() => toggleError(false)}>Retry</button>
			</LoadingError>
		)
	}

	if (item.type === "image" || parsedItem.category === 'image') {
		return (
			<Fragment>
				{loading ?
					<Spinner size={spinnerSize} />
					: null
				}
				<img
					src={item.type ? item.url : parsedItem.url}
					alt={item.title}
					draggable="false"
					loading="lazy"
					style={{ maxHeight: height, maxWidth: width, filter: loading ? 'brightness(0.4) blur(5px)' : 'none' }}
					onError={() => toggleError(true)}
					onLoad={() => toggleLoading(false)}
				/>
				{item.title ?
					<div className="media-viewer__title" style={titleStyles} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.title, { USE_PROFILES: { html: true } }) || "" }} />
					: null
				}
			</Fragment>
		)
	}

	if (parsedItem.category === 'video') {
		if (parsedItem.type === 'youtube') {
			return (
				<iframe
					src={parsedItem.url}
					width={width}
					height={height}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen={true}
					onLoad={() => toggleLoading(false)}
				/>
			)
		}

		if (parsedItem.type === 'vimeo') {
			return (
				<iframe
					src={parsedItem.url}
					width={width}
					height={height}
					frameBorder="0"
					allow="autoplay; fullscreen; picture-in-picture"
					allowFullScreen={true}
					onLoad={() => toggleLoading(false)}
				/>
			)
		}

		return (
			<video
				width={width}
				height={height}
				controls={true}
				onLoad={() => toggleLoading(false)}
			>
				<source src={parsedItem.url} />
			</video>
		)
	}

	return (
		<div>unsupported file</div>
	)
}

export default ItemComponent