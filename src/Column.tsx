import React, { useRef, FC } from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./hooks/useAppState";
import { useDragItem } from "./hooks/useDragItem";
import { Card } from "./Card";
import { moveList, addTask, moveTask, setDraggingItem } from "./state/actions";
import { useDrop } from "react-dnd";
import { isHidden } from "./DragItem";

type ColumnProps = { id: string; text: string; isPreview?: boolean; };

export const Column: FC<ColumnProps> = ({ id, text, isPreview }) => {
    const { getTasks, dispatch, draggedItem } = useAppState();
    const tasks = getTasks(id);
    const ref = useRef<HTMLDivElement>(null);
    const [, drop ] = useDrop({
        accept: [ "COLUMN", "CARD" ],
        hover: () => {
            if (!draggedItem) {
                return;
            }

            if (draggedItem.type === "COLUMN") {
                if (draggedItem.id === id) {
                    return;
                }
                dispatch(moveList(draggedItem.id, id));
            }
            else {
                if (draggedItem.columnId === id) {
                    return;
                }
                if (tasks.length) {
                    return;
                }
                dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
                dispatch(setDraggingItem({ ...draggedItem, columnId: id }));
            }
        }
    });
    const { drag } = useDragItem({ type: "COLUMN", id, text });
    drag(drop(ref));
    return (
        <ColumnContainer ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)} isPreview={isPreview}>
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map(t => (<Card id={t.id} key={t.id} text={t.text} columnId={id} />))}
            <AddNewItem toggleButtonText="+ Add another task"
                        onAdd={t => dispatch(addTask(t, id))}
                        dark />
        </ColumnContainer>
    );
};