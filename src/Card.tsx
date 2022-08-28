import { useRef } from "react";
import { CardContainer } from "./styles";
import { useDraggingItem } from "./hooks/useDraggingItem";
import { useDrop } from "react-dnd";
import { useAppState } from "./hooks/useAppState";
import { moveTask, setDraggingItem } from "./state/actions";
import { isHidden } from "./DraggingItem";

type CardProps = {
    text: string;
    id: string;
    columnId: string;
    isPreview?: boolean;
};

export const Card = ({ text, id, columnId, isPreview }: CardProps) => {
    const { draggingItem, dispatch } = useAppState();
    const ref = useRef<HTMLDivElement>(null);
    const { drag } = useDraggingItem({
        type: "CARD",
        id,
        text,
        columnId,
    });
    const [, drop ] = useDrop({
        accept: "CARD",
        hover: () => {
            if (!draggingItem) {
                return;
            }

            if (draggingItem.type !== "CARD") {
                return;
            }

            if (draggingItem.id === id) {
                return;
            }

            dispatch(moveTask(draggingItem.id, id, draggingItem.columnId, columnId));
            dispatch(setDraggingItem({ ...draggingItem, columnId }));
        }
    });

    drag(drop(ref));

    return (
        <CardContainer
            isHidden={isHidden(draggingItem, "CARD", id, isPreview)}
            isPreview={isPreview}
            ref={ref}>
            {text}
        </CardContainer>
    );
};