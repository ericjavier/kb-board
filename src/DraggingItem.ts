export type ColumnDraggingItem = {
    id: string;
    text: string;
    type: "COLUMN";
};

export type CardDraggingItem = {
    id: string;
    columnId: string;
    text: string;
    type: "CARD";
};

export type DraggingItem = ColumnDraggingItem | CardDraggingItem;

export const isHidden = (draggingItem: DraggingItem | null, type: string, id: string, isPreview?: boolean): boolean =>
    draggingItem !== null &&
    draggingItem.type === type &&
    draggingItem.id === id &&
    !isPreview;