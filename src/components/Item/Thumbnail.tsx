import React, { FunctionComponent, useMemo } from 'react'
import ThumbnailError from '../LoadingError/ThumbnailError';
import parseThumbnail from '../../../utils/parse-thumbnail';
import Item from '../../types/Item'

const Thumbnail: FunctionComponent<{ item: Item }> = ({ item }) => {
	const parsedItem = useMemo(() => parseThumbnail(item), []);

	if (item.type === "image" || parsedItem.category === 'image') {
		return (
			<img
				src={item.type ? item.thumbnailUrl : parsedItem.url}
				alt={item.title}
				draggable="false"
				style={{ maxHeight: 100, maxWidth: 100 }}
			/>
		)
	}

	if (parsedItem.category === 'video') {
		if (parsedItem.type === 'youtube') {
			return (
				<img
					src={item.type ? item.thumbnailUrl : parsedItem.url}
					alt={item.title}
					draggable="false"
					style={{ maxHeight: 100, maxWidth: 100 }}
				/>
			)
		}

		if (parsedItem.type === 'vimeo') {
			return (
				<img
					src={item.type ? item.thumbnailUrl : parsedItem.url}
					alt={item.title}
					draggable="false"
					style={{ maxHeight: 100, maxWidth: 100 }}
				/>
			)
		}

		return (
			<video
				width={100}
				height={100}
				controls={false}
			>
				<source src={parsedItem.url} />
			</video>
		)
	}

	return (
		<ThumbnailError />
	)
}

export default Thumbnail