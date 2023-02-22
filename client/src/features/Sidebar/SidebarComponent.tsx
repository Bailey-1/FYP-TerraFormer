import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import resourceLookup from '../../resources/ResourceLookup';
import onDragStart from '../../events/ResourceDragAndDrop';
import { addNode } from '../FlowSlice';
import { onSidebarClose } from '../SidebarSlice';

const SidebarComponent = () => {
    const dispatch = useDispatch();

    const open = useSelector((state: RootState) => state.sidebar.isOpen);

    const resourceId = useSelector(
        (state: RootState) => state.sidebar.resourceId,
    );

    const selectedResource = useSelector((state: RootState) =>
        state.flow.nodes.find((x) => x.id === resourceId),
    );

    if (!open) {
        return null;
    }

    const resourceStrings = resourceLookup.map((x) => x.name);

    const desc =
        'This is a description for this resource. This is a #azurerm_container_registry# for this resource. This is a description for this resource and some extra. ' +
        'This is a description for this resource. This is a description #azurerm_resource_group# for text this resource. This is a description for this ' +
        'resource. #azurerm_resource_group# This is text a description for this resource. This is a description for this text text resource. ' +
        'This is a description for this resource. This is a description for this resource.';

    const add = (x: string) => {
        dispatch(
            addNode({
                name: x,
                position: { x: 0, y: 0 },
            }),
        );
    };

    return (
        <div className="w-1/4 border-l-2 p-2 bg-gray-800 text-gray-300">
            <h1 className="text-2xl m-2 p-2 bg-gray-700 rounded">Sidebar</h1>
            <h2 className="text-xl mx-2 mt-2 p-2 bg-gray-700 rounded">
                Resource Info
            </h2>
            <div className="mx-2 px-2">
                {desc.split('#').map((x, i) => {
                    if (resourceStrings.includes(x)) {
                        return (
                            <button
                                className="bg-blue-500 inline-block cursor-grab rounded hover:bg-blue-400 px-1"
                                onDragStart={(event) => onDragStart(event, x)}
                                key={i}
                                draggable
                                onClick={() => add(x)}
                            >
                                {x}
                            </button>
                        );
                    }
                    return x;
                })}
            </div>
            <h2 className="text-xl m-2 p-2 bg-gray-700 rounded">
                Resource Description/Info
            </h2>
            <h2 className="text-xl m-2 p-2 bg-gray-700 rounded">Checklist</h2>
            <ul className="px-10">
                <li className="flex justify-between">
                    <p>Resource Group</p>
                    <span>✅</span>
                </li>
                <li className="flex justify-between">
                    <p>Network Interface</p>
                    <span>❌</span>
                </li>
                <li className="flex justify-between">
                    <p>Tags</p>
                    <span>✅</span>
                </li>
                <li className="flex justify-between">
                    <p>Permissions Block</p>
                    <span>✅</span>
                </li>
            </ul>

            <button onClick={() => dispatch(onSidebarClose())}>Close</button>
            <p>
                {selectedResource
                    ? selectedResource.data.resourceState.type
                    : 'No selected resource'}
            </p>
        </div>
    );
};

export default SidebarComponent;
