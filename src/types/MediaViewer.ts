import { CSSProperties, PropsWithChildren } from "react";
import Item from "./Item"

export interface MediaViewerProps extends PropsWithChildren {
    items: Item[];
    theme?: 'dark' | 'light' | 'transparent';
    hideControls?: boolean;
    titleStyles?: CSSProperties;
    swipeDistance?: number;
    galleryName?: string;
    spinnerSize?: number;
}