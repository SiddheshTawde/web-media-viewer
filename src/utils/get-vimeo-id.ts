// https://blog.devgenius.io/how-to-extract-the-id-of-a-youtube-or-vimeo-url-with-javascript-ad5e2d1049a

const getVimeoID = (url: string) => {
	// Look for a string with 'vimeo', then whatever, then a
	// forward slash and a group of digits.
	const match = /vimeo.*\/(\d+)/i.exec(url);
	// If the match isn't null (i.e. it matched)
	if (match) {
		// The grouped/matched digits from the regex
		return match[1];
	}
};

export default getVimeoID