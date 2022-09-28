// https://github.com/cookpete/react-player/blob/master/src/patterns.js

import Item from "../src/types/Item"
import getVimeoID from "./get-vimeo-id"
import getYoutubeID from "./get-youtube-id"

const MATCH_URL_YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//
const MATCH_URL_VIMEO = /vimeo\.com\/(?!progressive_redirect).+/
const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v|flv)(#t=[,\d+]+)?($|\?)/i
const IMAGE_EXTENSIONS = /\.(jpeg|jpg|png|gif|webp)(#t=[,\d+]+)?($|\?)/i

const parseThumbnail = (item: Item) => {

	if (IMAGE_EXTENSIONS.test(item.url)) {
		return { category: "image", url: item.thumbnailUrl ? item.thumbnailUrl : item.url }
	}

	if (VIDEO_EXTENSIONS.test(item.url) && !MATCH_URL_YOUTUBE.test(item.url) && !MATCH_URL_VIMEO.test(item.url)) {
		return { category: "video", type: "extension", url: item.url + "#t=5" }
	}

	if (MATCH_URL_YOUTUBE.test(item.url) && !VIDEO_EXTENSIONS.test(item.url)) {
		return { category: "video", type: "youtube", url: "https://i.ytimg.com/vi_webp/" + getYoutubeID(item.url) + "/default.webp" }
	}

	if (MATCH_URL_VIMEO.test(item.url) && !VIDEO_EXTENSIONS.test(item.url)) {
		return { category: "video", type: "vimeo", url: "https://vumbnail.com/" + getVimeoID(item.url) + ".jpg" }
	}

	return { category: "unsupported" }
}

export default parseThumbnail;