// TODO: Make this resource collapsable to hide details
import { IResourceObject } from '../../../interfaces/IResourceObject';

const ResourceElement = ({
    resource,
    addResource,
}: {
    resource: IResourceObject;
    addResource: () => void;
}) => {
    const onDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        nodeType: string,
    ) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className="flex flex-row bg-gray-200 m-2 rounded-lg hover:bg-gray-300 border border-gray-300 hover:border-gray-400 cursor-grab"
            onDragStart={(event) => onDragStart(event, resource.name)}
            draggable
        >
            <div className="p-2 m-2 grow">
                <div className="flex justify-between">
                    <h3 className="text-xl">{resource.display_name}</h3>
                    <button
                        className="bg-green-600 p-2 px-4 text-gray-200 rounded-lg border border-green-900 hover:bg-green-700"
                        onClick={addResource}
                    >
                        +
                    </button>
                </div>
                <a className="underline" href="https://google.com">
                    {resource.docs}
                </a>
                <p>
                    Description of the resource. Description of the resource.
                    Description of the resource.
                </p>
            </div>
        </div>
    );
};

export default ResourceElement;
