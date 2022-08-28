import React, { createContext, Dispatch, FC } from "react";
import { reducer, Task, List, AppState } from "./reducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DraggingItem } from "../DraggingItem";

const appData: AppState = {
    draggingItem: null,
    lists: [
        {
            id: "L1",
            text: "To Do",
            tasks: [
                {
                    id: "T1",
                    text: "Generate app scaffold"
                }
            ]
        },
        {
            id: "L2",
            text: "In Progress",
            tasks: [
                {
                    id: "T2",
                    text: "Learn Typescript"
                }
            ]
        },
        {
            id: "L3",
            text: "Done",
            tasks: [
                {
                    id: "T3",
                    text: "Begin to use static typing"
                },
                {
                    id: "T4",
                    text: "Deploy to github pages"
                }
            ]
        }
    ]
};

type AppContextProps = {
    lists: List[];
    getTasks(id: string): Task[];
    dispatch: Dispatch<Action>;
    draggingItem: DraggingItem | null;
};

export const AppStateContext = createContext<AppContextProps>({} as AppContextProps);

export const AppStateProvider: FC<React.PropsWithChildren> = ({ children }) => {
    const [ { lists, draggingItem }, dispatch ] = useImmerReducer(reducer, appData);

    const getTasks = (id: string) => {
        return lists.find(ls => ls.id === id)?.tasks || [];
    };

    return (
        <AppStateContext.Provider value={{ lists, getTasks, dispatch, draggingItem }}>
            {children}
        </AppStateContext.Provider>
    );
};