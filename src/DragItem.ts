export type ColumnDragItem = {
    id: string;
    text: string;
    type: "COLUMN";
};

export type CardDragItem = {
    id: string;
    columnId: string;
    text: string;
    type: "CARD";
};

export type DragItem = ColumnDragItem | CardDragItem;

export const isHidden = (draggedItem: DragItem | null, type: string, id: string, isPreview?: boolean): boolean =>
    draggedItem !== null &&
    draggedItem.type === type &&
    draggedItem.id === id &&
    !isPreview;