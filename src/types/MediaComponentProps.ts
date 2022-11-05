import { SpringValue } from "@react-spring/web"
import { ReactEventHandlers } from "react-use-gesture/dist/types";

import ItemProps from "./ItemProps";

export default interface MediaComponentProps {
	display: SpringValue<string>;
	scale: SpringValue<number>;
	x: SpringValue<number>;
	item: ItemProps;
	gesture: (...args: any[]) => ReactEventHandlers;
	height: number;
	width: number;
}