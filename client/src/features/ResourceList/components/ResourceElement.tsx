// TODO: Make this resource collapsable to hide details
import {
    IResourceKeyBlock,
    IResourceObject,
} from '../../../interfaces/IResourceObject';
import onDragStart from '../../../events/ResourceDragAndDrop';
import { useDispatch } from 'react-redux';
import { addNode, addSubNode } from '../../FlowSlice';

const ResourceElement = ({ resource }: { resource: IResourceObject }) => {
    const dispatch = useDispatch();

    const addResource = () => {
        dispatch(
            addNode({
                name: resource.name,
                position: { x: 0, y: 0 },
            }),
        );
    };

    const addBlock = (sub: IResourceKeyBlock) => {
        dispatch(
            addSubNode({
                name: sub.name,
                parentResourceName: resource.name,
                position: { x: 0, y: 0 },
            }),
        );
    };

    const r = resource.keys.filter(
        (x) => x.type === 'block',
    ) as IResourceKeyBlock[];

    return (
        <div
            className="flex flex-row bg-gray-800 m-2 rounded-lg hover:bg-gray-700 border border-gray-300 hover:border-gray-400 cursor-grab"
            onDragStart={(event) => onDragStart(event, resource.name)}
            draggable
        >
            <div className="p-2 m-2 grow">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl text-gray-200">
                        {resource.display_name}
                    </h3>
                    <button
                        className="bg-green-600 m-2 p-2 px-4 text-gray-200 rounded-lg border border-green-900 hover:bg-green-700 text-2xl"
                        onClick={addResource}
                    >
                        +
                    </button>
                </div>
                <a
                    className="underline text-gray-500"
                    href="https://google.com"
                >
                    {resource.docs}
                </a>
                <p className="text-gray-400">
                    Description of the resource. Description of the resource.
                    Description of the resource.
                </p>
                {r.map((sub: IResourceKeyBlock) => {
                    return (
                        <div
                            className="flex justify-between m-2 p-2 items-center border border-l-4 bg-gray-800 hover:bg-gray-700"
                            draggable
                            key={sub.name}
                        >
                            <h3 className="text-l text-gray-200">
                                {sub.display_name}
                            </h3>
                            <button
                                className="bg-yellow-600 p-2 px-4 text-gray-200 rounded hover:bg-yellow-700"
                                onClick={() => addBlock(sub)}
                            >
                                +
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResourceElement;
