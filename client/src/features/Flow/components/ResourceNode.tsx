import React, { memo } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import {
    Connection,
    Handle,
    Position,
    useNodeId,
    useUpdateNodeInternals,
} from 'reactflow';
import { IResourceState } from '../../../interfaces/IResourceState';
import { useDispatch } from 'react-redux';
import { onNodesChange, updateNodeKey } from '../../FlowSlice';
import resourceLookup from '../../../resources/ResourceLookup';
import ResourceKeyDecider from './ResourceKeyDecider';

const PillButton = ({
    children,
    onClick,
}: {
    children: string;
    onClick: (val: string) => void;
}) => {
    return (
        <button
            className="text-xs bg-orange-300 rounded-full p-1 px-2 m-1 flex"
            onClick={(e) => onClick(e.currentTarget.textContent || '')}
        >
            <div>{children}</div>
            <PlusCircleIcon className="ml-1 h-4 w-4 text-gray-700" />
        </button>
    );
};

const DisclosureComponent = ({
    onClick,
}: {
    onClick: (val: string) => void;
}) => {
    return (
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
                            <PillButton onClick={onClick}>
                                Example Button
                            </PillButton>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
};

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

    const onClick = (val: string) => {
        // setKeys((prevState) => [...prevState, val]);

        if (nodeId) {
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

    if (!globalResource) {
        return <p>Error: globalResource is not defined {globalResource}</p>;
    }

    return (
        <div
            className={`bg-gray-800 p-2 rounded border text-gray-300 ${
                selected ? 'border-gray-400' : 'border-gray-800'
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
            <div className="flex justify-between">
                <h1 className="text-xl text-blue-500">
                    {globalResource.display_name}
                </h1>
                <button className="h-8 nodrag">
                    <XMarkIcon
                        className="h-full text-red-700 hover:text-red-500 hover:bg-gray-700 rounded"
                        onClick={() => removeNode()}
                    />
                </button>
            </div>
            <h2 className="text-base text-gray-500">
                {data.resourceState.type}
            </h2>
            <p>NodeID: {nodeId}</p>

            {data.resourceState.keys.map((x, i) => {
                return (
                    <ResourceKeyDecider
                        key={x.id}
                        keyState={x}
                        globalKey={globalResource.keys.find(
                            (gk) => gk.name === x.name,
                        )}
                        onChange={updateKey}
                    />
                );
            })}

            <DisclosureComponent onClick={onClick} />
        </div>
    );
};

export default memo(ResourceNode);
