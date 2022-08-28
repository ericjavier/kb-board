import { useDragLayer } from "react-dnd";
import { Column } from "./Column";
import { Card } from "./Card";
import { CustomDragLayerContainer, DragPreviewWrapper } from "./styles";
import { useAppState } from "./hooks/useAppState";

export const CustomDragLayer = () => {
    const { draggedItem: draggingItem } = useAppState();
    const { currentOffset } = useDragLayer((monitor) =>  ({
        currentOffset: monitor.getSourceClientOffset(),
    }));

    if (!draggingItem || !currentOffset) {
        return null;
    }

    if (draggingItem.type === "COLUMN") {
        return (
            <CustomDragLayerContainer>
                <DragPreviewWrapper position={currentOffset}>
                    <Column id={draggingItem.id} text={draggingItem.text} isPreview />
                </DragPreviewWrapper>
            </CustomDragLayerContainer>
        );
    }

    // draggingItem.type === "CARD"
    return (
        <CustomDragLayerContainer>
            <DragPreviewWrapper position={currentOffset}>
                <Card id={draggingItem.id} text={draggingItem.text} columnId={draggingItem.columnId} isPreview />
            </DragPreviewWrapper>
        </CustomDragLayerContainer>
    );
};