// REFER - https://stackoverflow.com/questions/38679681/getting-a-file-type-from-url

const getMIMEType = (url: string) => {
	return new Promise((resolve: (value: string) => void, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);

		xhr.onreadystatechange = function () {
			// Wait for header to become available.

			const contentType = xhr.getResponseHeader('Content-Type');
			if (contentType) {
				// Stop downloading, the headers are all we need.
				xhr.abort();

				resolve(contentType.split('/')[0])
			}
		};

		xhr.onerror = () => {
			reject("error for " + url);
		};

		xhr.send();
	})
}

export default getMIMEType;