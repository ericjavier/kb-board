import { useContext } from "react";
import { AppStateContext } from "../state/AppContext";

export const useAppState = () => {
    return useContext(AppStateContext);
};