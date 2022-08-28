import React, { useRef, FC } from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./hooks/useAppState";
import { useDraggingItem } from "./hooks/useDraggingItem";
import { Card } from "./Card";
import { moveList, addTask } from "./state/actions";
import { useDrop } from "react-dnd";
import { isHidden } from "./DraggingItem";

type ColumnProps = { id: string; text: string; isPreview?: boolean; };

export const Column: FC<ColumnProps> = ({ id, text, isPreview }) => {
    const { getTasks, dispatch, draggingItem } = useAppState();
    const tasks = getTasks(id);
    const dragginRef = useRef<HTMLDivElement>(null);
    const [, drop ] = useDrop({
        accept: "COLUMN",
        hover: () => {
            if (!draggingItem) {
                return;
            }
            if (draggingItem.type === "COLUMN" && draggingItem.id !== id) {
                dispatch(moveList(draggingItem.id, id));
            }
        }
    });
    const { drag } = useDraggingItem({ type: "COLUMN", id, text });
    drag(drop(dragginRef));
    return (
        <ColumnContainer ref={dragginRef} isHidden={isHidden(draggingItem, "COLUMN", id, isPreview)} isPreview={isPreview}>
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map(t => (<Card id={t.id} key={t.id} text={t.text} />))}
            <AddNewItem toggleButtonText="+ Add another task"
                        onAdd={t => dispatch(addTask(t, id))}
                        dark />
        </ColumnContainer>
    );
};