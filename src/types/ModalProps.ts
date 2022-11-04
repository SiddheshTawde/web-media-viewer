import { Dispatch, SetStateAction } from "react";
import ItemProps from "./ItemProps";

export default interface ModalProps {
	items: ItemProps[],
	height: number;
	width: number;
	open: boolean;
	toggle: Dispatch<SetStateAction<boolean>>;
	galleryTitle?: string;
	handleJumpToNavigation: (targetIndex: number) => void;
}