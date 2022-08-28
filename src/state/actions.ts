import { DraggingItem } from "../DraggingItem";

export type AddListAction = { type: "ADD_LIST"; text: string; };

export const addList = (text: string): Action => {
    return { type: "ADD_LIST", text: text };
};

type AddTaskAction = { type: "ADD_TASK"; text: string; listId: string; };

export const addTask = (text: string, listId: string): Action => {
    return { type: "ADD_TASK", text: text, listId: listId };
};


type MoveListAction = { type: "MOVE_LIST"; movingFrom: string; movingTo: string;  };

export const moveList = (movingFrom: string, movingTo: string): Action => {
    return { type: "MOVE_LIST", movingFrom: movingFrom, movingTo: movingTo };
};

type MoveTaskAction = { 
    type: "MOVE_TASK";
    draggingId: string;
    hoveringId: string | null;
    sourceColumnId: string;
    targetColumnId: string;
};

export const moveTask = (draggingId: string, hoveringId: string | null, sourceColumnId: string, targetColumnId: string): Action => {
    return {
        type: "MOVE_TASK",
        draggingId: draggingId,
        hoveringId: hoveringId,
        sourceColumnId: sourceColumnId,
        targetColumnId: targetColumnId
    };
};

type SetDraggingItemAction = { type: "SET_DRAGGING_ITEM"; draggingItem: DraggingItem | null; };

export const setDraggingItem = (draggingItem: DraggingItem | null = null): Action => {
    return { type: "SET_DRAGGING_ITEM", draggingItem: draggingItem };
};

export type Action = AddListAction
    | AddTaskAction
    | MoveListAction
    | MoveTaskAction
    | SetDraggingItemAction;