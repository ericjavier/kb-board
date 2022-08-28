import React, { useRef, FC } from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./hooks/useAppState";
import { useDraggingItem } from "./hooks/useDraggingItem";
import { Card } from "./Card";
import { moveList, addTask, moveTask, setDraggingItem } from "./state/actions";
import { useDrop } from "react-dnd";
import { isHidden } from "./DraggingItem";

type ColumnProps = { id: string; text: string; isPreview?: boolean; };

export const Column: FC<ColumnProps> = ({ id, text, isPreview }) => {
    const { getTasks, dispatch, draggingItem } = useAppState();
    const tasks = getTasks(id);
    const dragginRef = useRef<HTMLDivElement>(null);
    const [, drop ] = useDrop({
        accept: [ "COLUMN", "CARD" ],
        hover: () => {
            if (!draggingItem) {
                return;
            }

            if (draggingItem.type === "COLUMN") {
                if (draggingItem.id === id) {
                    return;
                }
                dispatch(moveList(draggingItem.id, id));
            }
            else {
                if (draggingItem.columnId === id) {
                    return;
                }
                if (tasks.length) {
                    return;
                }
                dispatch(moveTask(draggingItem.id, null, draggingItem.columnId, id));
                dispatch(setDraggingItem({ ...draggingItem, columnId: id }));
            }
        }
    });
    const { drag } = useDraggingItem({ type: "COLUMN", id, text });
    drag(drop(dragginRef));
    return (
        <ColumnContainer ref={dragginRef} isHidden={isHidden(draggingItem, "COLUMN", id, isPreview)} isPreview={isPreview}>
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map(t => (<Card id={t.id} key={t.id} text={t.text} columnId={id} />))}
            <AddNewItem toggleButtonText="+ Add another task"
                        onAdd={t => dispatch(addTask(t, id))}
                        dark />
        </ColumnContainer>
    );
};