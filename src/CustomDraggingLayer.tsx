import { useDragLayer } from "react-dnd";
import { Column } from "./Column";
import { CustomDraggingLayerContainer, DraggingPreviewWrapper } from "./styles";
import { useAppState } from "./hooks/useAppState";

export const CustomDraggingLayer = () => {
    const { draggingItem } = useAppState();
    const { currentOffset } = useDragLayer((monitor) =>  ({
        currentOffset: monitor.getSourceClientOffset(),
    }));

    if (draggingItem && currentOffset) {
        return (
            <CustomDraggingLayerContainer>
                <DraggingPreviewWrapper position={currentOffset}>
                    <Column id={draggingItem.id} text={draggingItem.text} isPreview />
                </DraggingPreviewWrapper>
            </CustomDraggingLayerContainer>
        );
    }

    return null;
};