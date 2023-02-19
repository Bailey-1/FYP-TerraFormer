export default function onDragStart<T extends React.DragEvent>(
    event: T,
    nodeType: string,
): void {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
}
