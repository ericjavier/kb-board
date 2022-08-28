import { useDrag } from "react-dnd";
import { DragItem } from "../DragItem";
import { setDraggingItem } from "../state/actions";
import { useAppState } from "./useAppState";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useEffect } from "react";

export const useDragItem = (item: DragItem) => {
    const { dispatch } = useAppState();
    const [, drag, preview ] = useDrag({
        type: item.type,
        item: () => {
            dispatch(setDraggingItem(item));
            return item;
        },
        end: () => dispatch(setDraggingItem())
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [ preview ])

    return { drag };
};