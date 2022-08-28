import { Action } from "./actions";
import { nanoid } from "nanoid";
import { findItemIndexById, moveItem } from "../utils/arrayUtils";
import { DraggingItem } from "../DraggingItem";

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
    draggingItem: DraggingItem | null;
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
        case "SET_DRAGGING_ITEM": {
            draft.draggingItem = action.draggingItem;
            break;
        }
        default: break;
    }
};