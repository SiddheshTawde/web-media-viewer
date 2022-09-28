// https://blog.devgenius.io/how-to-extract-the-id-of-a-youtube-or-vimeo-url-with-javascript-ad5e2d1049a

const getYouTubeID = (url: string) => {
	// Our regex pattern to look for a youTube ID
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	//Match the url with the regex
	const match = url.match(regExp);
	//Return the result
	return match && match[2].length === 11 ? match[2] : undefined;
};

export default getYouTubeID