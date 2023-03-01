import React, { memo } from 'react';
import {
    ChevronUpIcon,
    InformationCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import {
    Connection,
    Handle,
    Position,
    useNodeId,
    useUpdateNodeInternals,
} from 'reactflow';
import { IResourceState } from '../../../../interfaces/IResourceState';
import { useDispatch, useSelector } from 'react-redux';
import {
    addNewNodeKey,
    onNodesChange,
    updateNodeKey,
} from '../../../FlowSlice';
import resourceLookup from '../../../../resources/ResourceLookup';
import ResourceKeyDecider from '../ResourceKeyDecider';
import providerColours from '../../../../resources/ProviderColours';
import { onSidebarUpdate } from '../../../SidebarSlice';
import { RootState } from '../../../../store/store';
import { Disclosure } from '@headlessui/react';
import { IResourceKeys } from '../../../../interfaces/IResourceObject';
import PillButton from '../../../../components/controls/PillBtn';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const ResourceNode = ({
    id,
    data,
    selected,
}: {
    id: string;
    data: { resourceState: IResourceState };
    selected: boolean;
}) => {
    const dispatch = useDispatch();
    const nodeId = useNodeId();
    const updateNodeInternals = useUpdateNodeInternals();

    const globalResource = resourceLookup.find(
        (x) => x.name === data.resourceState.type,
    );

    const additionalDetails = useSelector(
        (state: RootState) => state.settings.additionalDetails,
    );

    const addExtraKey = (obj: IResourceKeys) => {
        // setKeys((prevState) => [...prevState, val]);

        if (nodeId) {
            dispatch(
                addNewNodeKey({
                    nodeId: nodeId,
                    keyName: obj.name,
                    keyType: obj.type,
                }),
            );

            updateNodeInternals(nodeId);
        }
    };

    const updateKey = (name: string, value: string) => {
        dispatch(
            updateNodeKey({
                nodeId: nodeId || '',
                key: name,
                value,
            }),
        );
    };

    const removeNode = () => {
        dispatch(
            onNodesChange([
                {
                    id: nodeId || '',
                    type: 'remove',
                },
            ]),
        );
    };

    const openSidebar = () => {
        dispatch(
            onSidebarUpdate({
                isOpen: true,
                resourceId: id,
                resourceType: data.resourceState.type,
            }),
        );
    };

    if (!globalResource) {
        return <p>Error: globalResource is not defined {globalResource}</p>;
    }

    const pillBtnsArr = globalResource.keys
        .filter(
            (x) =>
                !x.required &&
                !data.resourceState.keys.map((x) => x.name).includes(x.name),
        )
        .map((x) => {
            return (
                <PillButton
                    key={x.name}
                    onClick={() => addExtraKey(x)}
                    className="bg-orange-300"
                >
                    <p>{x.display_name}</p>
                    <PlusCircleIcon className="ml-1 h-4 w-4 text-gray-700" />
                </PillButton>
            );
        });

    return (
        <div
            className={`border text-gray-300 rounded-t-xl ${
                selected ? 'border-gray-400' : 'border-transparent'
            }`}
        >
            {/* Completed resource node */}
            <Handle
                type="source"
                position={Position.Right}
                id={globalResource.name}
                style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '10px',
                    right: '-15px',
                }}
                isValidConnection={(connection: Connection) => {
                    return (
                        connection.targetHandle?.includes(
                            globalResource.name,
                        ) || false
                    );
                }}
            />
            <div
                className={`flex justify-between p-2 rounded-t-xl items-center ${
                    providerColours[globalResource.provider]?.background
                }`}
            >
                <h1
                    className={`text-xl text-gray-200 ${
                        providerColours[globalResource.provider]?.foreground
                    }`}
                >
                    {globalResource.display_name}
                </h1>
                <div>
                    <button className="h-7 nodrag mr-2">
                        <InformationCircleIcon
                            className="h-full text-gray-300 hover:text-gray-200 hover:bg-gray-700 rounded"
                            onClick={() => openSidebar()}
                        />
                    </button>
                    <button className="h-7 nodrag">
                        <XMarkIcon
                            className="h-full text-red-700 hover:text-red-500 hover:bg-gray-700 rounded"
                            onClick={() => removeNode()}
                        />
                    </button>
                </div>
            </div>
            <div className="p-2 bg-gray-800 rounded-b">
                {additionalDetails && (
                    <h2 className="text-base text-gray-500">
                        {data.resourceState.type}
                    </h2>
                )}
                {additionalDetails && <p>NodeID: {nodeId}</p>}

                {data.resourceState.keys.map((x, i) => {
                    return (
                        <div className="border-b pb-2" key={x.id}>
                            <ResourceKeyDecider
                                keyState={x}
                                globalKey={globalResource.keys.find(
                                    (gk) => gk.name === x.name,
                                )}
                                onChange={updateKey}
                            />
                        </div>
                    );
                })}

                <div className="mx-auto w-full max-w-md rounded-2xl pt-2">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-2 py-1 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Additional Keys</span>
                                    <ChevronUpIcon
                                        className={`${
                                            open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="p-2 text-sm text-gray-500 flex flex-wrap justify-center">
                                    {pillBtnsArr.length ? (
                                        pillBtnsArr
                                    ) : (
                                        <p>
                                            No additional arguments available.
                                        </p>
                                    )}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            </div>
        </div>
    );
};

export default memo(ResourceNode);