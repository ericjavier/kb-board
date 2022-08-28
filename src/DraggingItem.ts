export type ColumnDraggingItem = {
    id: string;
    text: string;
    type: "COLUMN";
};

export type DraggingItem = ColumnDraggingItem;

export const isHidden = (draggingItem: DraggingItem | null, type: string, id: string, isPreview?: boolean): boolean =>
    draggingItem !== null &&
    draggingItem.type === type &&
    draggingItem.id === id &&
    !isPreview;