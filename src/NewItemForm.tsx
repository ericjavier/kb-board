import React, { useState } from "react";
import { NewItemFormContainer, NewItemButton, NewItemInput } from "./styles";
import { useFocus } from "./hooks/useFocus";

type NewItemFormProps = {
    onAdd(text: string): void;
};



export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
    const [ text, setText ] = useState("");
    const inputRef = useFocus();

    const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onAdd(text);
        }
    };

    return (
        <NewItemFormContainer>
            <NewItemInput ref={inputRef} value={text} onChange={e => setText(e.target.value)} onKeyPress={handleKeyPressed} />
            <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
        </NewItemFormContainer>
    );
};