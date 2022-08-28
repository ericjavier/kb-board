import { useDragLayer } from "react-dnd";
import { Column } from "./Column";
import { Card } from "./Card";
import { CustomDraggingLayerContainer, DraggingPreviewWrapper } from "./styles";
import { useAppState } from "./hooks/useAppState";

export const CustomDraggingLayer = () => {
    const { draggingItem } = useAppState();
    const { currentOffset } = useDragLayer((monitor) =>  ({
        currentOffset: monitor.getSourceClientOffset(),
    }));

    if (!draggingItem || !currentOffset) {
        return null;
    }

    if (draggingItem.type === "COLUMN") {
        return (
            <CustomDraggingLayerContainer>
                <DraggingPreviewWrapper position={currentOffset}>
                    <Column id={draggingItem.id} text={draggingItem.text} isPreview />
                </DraggingPreviewWrapper>
            </CustomDraggingLayerContainer>
        );
    }

    // draggingItem.type === "CARD"
    return (
        <CustomDraggingLayerContainer>
            <DraggingPreviewWrapper position={currentOffset}>
                <Card id={draggingItem.id} text={draggingItem.text} columnId={draggingItem.columnId} isPreview />
            </DraggingPreviewWrapper>
        </CustomDraggingLayerContainer>
    );
};