import { FunctionComponent } from "react";
import useMeasure from "react-use-measure"
import { animated, useTransition } from "@react-spring/web"
import DOMPurify from "dompurify";

import ModalProps from "../../types/ModalProps";

const Modal: FunctionComponent<ModalProps> = ({ open, toggle, height, width, galleryName, items, handleJumpToNavigation }) => {
	const [headerRef, rect] = useMeasure()

	const modal = useTransition(open, {
		from: { opacity: 0, width: 0, height: 0 },
		enter: () => async (next) => {
			await next({ opacity: 1, height: 4, width: width });
			await next({ opacity: 1, height: height, width: width });
		},
		leave: () => async (next) => {
			await next({ opacity: 1, height: 4, width: width });
			await next({ opacity: 1, height: 0, width: 0 });
			await next({ opacity: 0, height: 0, width: 0 });
		}
	});

	return modal((props, show) =>
		show ?
			<animated.div style={props} className="media_viewer--modal_container absolute top-0 left-0 right-0 bottom-0 m-auto bg-black/60 z-10 overflow-hidden backdrop-blur-sm">
				<div ref={headerRef} className="media_viewer--modal_header w-full h-16 flex items-center justify-between bg-black/20 backdrop-blur-sm">
					<p className="media_viewer--gallery_name text-lg font-bold text-white px-4">{galleryName}</p>
					<button onClick={() => toggle(false)} className="media_viewer--modal_close text-gray-300 hover:text-white rounded p-3 mx-4 w-fit h-fit transition-colors">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div className="media_viewer--thumbnails_container overflow-y-auto" style={{ height: height - rect.height }}>
					{items.map((item, index) =>
						<button className="media_viewer--thumbnail_item flex items-center w-full text-white my-4" onClick={() => handleJumpToNavigation(index)}>
							<div className="media_viewer--thumbnail_count px-2 w-12">{index + 1}</div>
							<div className="media_viewer--thumbnail h-24 w-24 flex items-center justify-center">
								<img src={item.thumbnail || item.url} className="max-h-24 max-w-24" />
							</div>
							<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.title || "") }} className="media_viewer--thumbnail_title px-4 text-left" />
						</button>
					)}
				</div>
			</animated.div>
			: null
	)
}

export default Modal