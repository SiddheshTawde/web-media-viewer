// https://github.com/cookpete/react-player/blob/master/src/patterns.js

import getVimeoID from "./get-vimeo-id"
import getYoutubeID from "./get-youtube-id"

const MATCH_URL_YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//
const MATCH_URL_VIMEO = /vimeo\.com\/(?!progressive_redirect).+/
const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v|flv)(#t=[,\d+]+)?($|\?)/i
const IMAGE_EXTENSIONS = /\.(jpeg|jpg|png|gif|webp)(#t=[,\d+]+)?($|\?)/i

const parseURL = (url: string) => {

	if (IMAGE_EXTENSIONS.test(url)) {
		return { category: "image", url }
	}

	if (VIDEO_EXTENSIONS.test(url) && !MATCH_URL_YOUTUBE.test(url) && !MATCH_URL_VIMEO.test(url)) {
		return { category: "video", type: "extension", url }
	}

	if (MATCH_URL_YOUTUBE.test(url) && !VIDEO_EXTENSIONS.test(url)) {
		return { category: "video", type: "youtube", url: "https://www.youtube.com/embed/" + getYoutubeID(url) }
	}

	if (MATCH_URL_VIMEO.test(url) && !VIDEO_EXTENSIONS.test(url)) {
		return { category: "video", type: "vimeo", url: "https://player.vimeo.com/video/" + getVimeoID(url) }
	}

	return { category: "unsupported" }
}

export default parseURL;