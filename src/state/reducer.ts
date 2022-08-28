import { Action } from "./actions";
import { nanoid } from "nanoid";
import { findItemIndexById, moveItem } from "../utils/arrayUtils";
import { DragItem } from "../DragItem";

export type Task = {
    id: string;
    text: string;
};

export type List = {
    id: string;
    text: string;
    tasks: Task[];
};

export type AppState = {
    lists: List[];
    draggedItem: DragItem | null;
};

export const reducer = (draft: AppState, action: Action): AppState | void => {
    switch (action.type) {
        case "ADD_LIST": {
            draft.lists.push({ id: nanoid(), text: action.text, tasks: [] });
            break;
        }
        case "ADD_TASK": {
            const targetListIndex = findItemIndexById(draft.lists, action.listId);
            draft.lists[targetListIndex].tasks.push({ 
                id: nanoid(),
                text: action.text,
            });
            break;
        }
        case "MOVE_LIST": {
            const { movingFrom, movingTo } = action;
            const movingFromIndex = findItemIndexById(draft.lists, movingFrom);
            const movingToIndex = findItemIndexById(draft.lists, movingTo);
            draft.lists = moveItem(draft.lists, movingFromIndex, movingToIndex);
            break;
        }
        case "MOVE_TASK": {
            const { draggingId, hoveringId, sourceColumnId, targetColumnId } = action;
            const sourceListIndex = findItemIndexById(draft.lists, sourceColumnId);
            const targetListIndex = findItemIndexById(draft.lists, targetColumnId);
            const dragIndex = findItemIndexById(draft.lists[sourceListIndex].tasks, draggingId);
            const hoverIndex = hoveringId ? findItemIndexById(draft.lists[targetListIndex].tasks, hoveringId) : 0;
            const item = draft.lists[sourceListIndex].tasks[dragIndex];
            // Remove the task from the source list
            draft.lists[sourceListIndex].tasks.splice(dragIndex, 1)
            // Add the task to the target list
            draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, item)
            break;
        }
        case "SET_DRAGGING_ITEM": {
            draft.draggedItem = action.draggingItem;
            break;
        }
        default: break;
    }
};