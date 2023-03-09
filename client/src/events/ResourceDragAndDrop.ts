export default function onDragStart<T extends React.DragEvent>(
    event: T,
    nodeType: string,
    resourceName: string,
): void {
    event.dataTransfer.setData('application/nodeType', nodeType);
    event.dataTransfer.setData('application/resourceName', resourceName);
    event.dataTransfer.effectAllowed = 'move';
}
