import React, { Fragment } from "react"
import { useSprings, useTrail, animated } from "@react-spring/web"
import useMeasure from "react-use-measure"
import { useDrag } from "@use-gesture/react"
import clamp from "lodash.clamp"
import { TiArrowLeftThick, TiArrowRightThick, TiTimes } from "react-icons/ti"
import { MediaViewerProps } from "../../types/MediaViewer"
import DeviceDetect from "../../../utils/detect-device"
import getMIMEType from "../../../utils/get-mime-type"
import Item from "../../types/Item"
// @ts-ignore - dompurify does not includes type definitions
import DOMPurify from "dompurify"
import LoadingError from "../LoadingError/LoadingError"

import "./MediaViewer.css"
import Spinner from "../Spinner/Spinner"
import ThumbnailError from "../LoadingError/ThumbnailError"

const MediaViewer: React.FunctionComponent<MediaViewerProps> = ({ items, theme = "light", hideControls, titleStyles, swipeDistance, galleryName = "", spinnerSize }) => {
  const isMobile = DeviceDetect();

  const [isLoading, toggleLoading] = React.useState(true);

  const [itemList, updateItemList] = React.useState<Item[]>([]);
  const [index, updateIndex] = React.useState(0);

  const [container, { height, width }] = useMeasure();
  const [props, api] = useSprings(itemList.length, i => ({ x: i * width, scale: width === 0 ? 0 : 1, display: "flex" }), [width])

  const [open, toggle] = React.useState(false);
  const trail = useTrail(itemList.length, {
    opacity: open ? 1 : 0,
    x: open ? 0 : -200,
    from: { opacity: 0, x: -200 },
  });

  const handleSwipeGesture = useDrag(({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (active && distance[0] > (swipeDistance || width / 2)) {
      updateIndex(clamp(index + (xDir > 0 ? -1 : 1), 0, itemList.length - 1))
      cancel()
    }
    api.start(i => {
      if (i < index - 1 || i > index + 1) return { display: "none" }
      const x = (i - index) * width + (active ? mx : 0)
      const scale = active ? 1 - distance[0] / width / 2 : 1
      return { x, scale, display: "flex" }
    })
  });

  const handleNavigation = (index: number) => {
    updateIndex(index);

    api.start(i => {
      if (i < index - 1 || i > index + 1) return { display: "none" }
      const x = (i - index) * width
      const scale = 1
      return { x, scale, display: "flex" }
    })
  };

  const handleJumpToSlide = (index: number) => {
    updateIndex(index);

    api.start(i => {
      if (i < index - 1 || i > index + 1) return { display: "none" }
      const x = (i - index) * width
      const scale = 1
      return { x, scale, display: "flex" }
    });

    toggle(false);
  };

  const parseInput = async () => {
    const updatedItems: Item[] = [];

    for (let i = 0; i < items.length; i++) {
      const extended_item = { ...items[i] };
      const type = await getMIMEType(extended_item.url);

      if (type === 'text') {
        extended_item["hasError"] = true;
      } else {
        extended_item["type"] = type;
        extended_item["hasError"] = false;
      }

      updatedItems.push(extended_item);
    }

    return updatedItems;
  }

  React.useEffect(() => {

    parseInput()
      .then((updatedItems) => {
        console.log({ updatedItems })

        toggleLoading(false);
        updateItemList(updatedItems);

      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <main ref={container} className={`media-viewer__container media-viewer__container-background--${theme}`}>

      {isLoading ? <div><Spinner size={spinnerSize} /></div> :
        <Fragment>
          <div className="media-viewer__overlay" style={{ opacity: open ? 1 : 0, zIndex: open ? 9999 : -1 }}>
            <header className='media-viewer__overlay-header'>
              <h3 style={{ margin: 0, color: "#FFFFFF" }}>{galleryName}</h3>
              <TiTimes fontSize={24} color={"#FFFFFF"} style={{ cursor: "pointer" }} onClick={() => toggle(!open)} />
            </header>

            <div className="media-viewer__overlay-thumbnail-container">
              {trail.map(({ opacity, x }, i) =>
                <animated.div key={i} className="media-viewer__overlay-thumbnail" style={{ opacity, x }} onClick={() => handleJumpToSlide(i)}>
                  <div className="media-viewer__overlay-title"><h4>{i + 1}</h4></div>
                  <div style={{ display: "flex", alignItems: "center", height: 100, width: 100 }}>
                    {itemList[i].hasError ?
                      <ThumbnailError /> :
                      <img src={itemList[i].url} alt={itemList[i].title} draggable="false" style={{ maxHeight: 100, maxWidth: 100 }} />
                    }
                  </div>
                  {itemList[i].title ?
                    <div className="media-viewer__overlay-title" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(itemList[i].title, { USE_PROFILES: { html: true } }) || "" }} />
                    : null
                  }
                </animated.div>
              )}
            </div>
          </div>

          <header className='media-viewer__header' onClick={() => toggle(!open)}>
            {itemList.length === 0 ? "- / -" : (index + 1) + " / " + itemList.length}
          </header>

          {index === 0 || isMobile || hideControls ? null :
            <button className="media-viewer__nav-button media-viewer__left-nav" disabled={index === 0} onClick={() => handleNavigation(index - 1)}>
              <TiArrowLeftThick fontSize={24} color={"#FFFFFF"} />
            </button>
          }

          {props.map(({ x, display, scale }, i) =>
            <animated.div key={i} className="media-viewer__item" {...handleSwipeGesture()} style={{ display, x, scale }}>
              {itemList[i].hasError ?
                <LoadingError /> :
                <Fragment>
                  {itemList[i].type === 'video' ?
                    <video controls style={{ maxHeight: height, maxWidth: width }}>
                      <source src={itemList[i].url} type="video/mp4" />
                    </video> :
                    <img src={itemList[i].url} alt={itemList[i].title} draggable="false" onError={e => console.error(e)} loading="lazy" style={{ maxHeight: height, maxWidth: width }} />
                  }
                  {itemList[i].title ?
                    <div className="media-viewer__title" style={titleStyles} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(itemList[i].title, { USE_PROFILES: { html: true } }) || "" }} />
                    : null
                  }
                </Fragment>
              }


            </animated.div>
          )}

          {index === itemList.length - 1 || isMobile || hideControls ? null :
            <button className="media-viewer__nav-button media-viewer__right-nav" disabled={index === itemList.length - 1} onClick={() => handleNavigation(index + 1)}>
              <TiArrowRightThick fontSize={24} color={"#FFFFFF"} />
            </button>
          }
        </Fragment>
      }

    </main>
  )
}

export default MediaViewer;

