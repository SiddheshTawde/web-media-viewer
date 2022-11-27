import { FunctionComponent } from "react"

const PlaceholderThumbnail: FunctionComponent = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="96px" height="74px" viewBox="0 0 95 74" version="1.1">
			<defs>
				<filter id="alpha" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">
					<feColorMatrix type="matrix" in="SourceGraphic" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
				</filter>
				<mask id="mask0">
					<g filter="url(#alpha)">
						<rect x="0" y="0" width="95" height="74" style={{ fill: "rgb(0% 0% 0%)", fillOpacity: 0.67451, stroke: "none" }} />
					</g>
				</mask>
				<clipPath id="clip1">
					<rect x="0" y="0" width="95" height="74" />
				</clipPath>
				<g id="surface5" clip-path="url(#clip1)">
					<path style={{ stroke: "none", fillRule: "nonzero", fill: "rgb(100%,100%,100%)", fillOpacity: 1 }} d="M 55.316406 35.425781 L 37.257812 53.566406 L 28.839844 45.109375 L 6.730469 67.320312 L 87.066406 67.320312 Z M 55.316406 35.425781 " />
				</g>
				<mask id="mask1">
					<g filter="url(#alpha)">
						<rect x="0" y="0" width="95" height="74" style={{ fill: "rgb(0%,0%,0%)", fillOpacity: 0.67451, stroke: "none" }} />
					</g>
				</mask>
				<clipPath id="clip2">
					<rect x="0" y="0" width="95" height="74" />
				</clipPath>
				<g id="surface8" clip-path="url(#clip2)">
					<path style={{ stroke: "none", fillRule: "nonzero", fill: "rgb(100%,100%,100%)", fillOpacity: 1 }} d="M 29.738281 22.203125 C 29.738281 25.648438 26.957031 28.4375 23.53125 28.4375 C 20.101562 28.4375 17.320312 25.648438 17.320312 22.203125 C 17.320312 18.757812 20.101562 15.96875 23.53125 15.96875 C 26.957031 15.96875 29.738281 18.757812 29.738281 22.203125 Z M 29.738281 22.203125 " />
				</g>
			</defs>
			<g id="surface1">
				<path style={{ stroke: "none", fillRule: "nonzero", fill: "rgb(81.568627%,81.568627%,81.568627%)", fillOpacity: 1 }} d="M 0 0 L 94.96875 0 L 94.96875 74.050781 L 0 74.050781 Z M 0 0 " />
				<use xlinkHref="#surface5" mask="url(#mask0)" />
				<use xlinkHref="#surface8" mask="url(#mask1)" />
			</g>
		</svg>

	);
};

export default PlaceholderThumbnail