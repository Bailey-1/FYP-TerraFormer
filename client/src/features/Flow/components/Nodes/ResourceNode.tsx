import React, { memo } from 'react';
import {
    ChevronUpIcon,
    InformationCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { Handle, Position, useNodeId, useUpdateNodeInternals } from 'reactflow';
import { IResourceState } from '@bailey-1/terraformwebapp-common';
import { useDispatch, useSelector } from 'react-redux';
import resourceLookup from '../../../../resources/ResourceLookup';
import ResourceKeyDecider from '../ResourceKeyDecider';
import providerColours from '../../../../resources/ProviderColours';
import { onSidebarUpdate } from '../../../SidebarSlice';
import { RootState } from '../../../../store/store';
import { Disclosure } from '@headlessui/react';
import PillButton from '../../../../components/controls/PillBtn';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import {
    addExtraKey,
    removeNode,
    updateKey,
} from '../../utility/NodeUtilityFunctions';

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

    if (!nodeId) {
        return <p>Error: No nodeId</p>;
    }

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
                    onClick={() => {
                        addExtraKey(dispatch, nodeId, x);
                        updateNodeInternals(nodeId);
                    }}
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
                            onClick={() => removeNode(dispatch, nodeId)}
                        />
                    </button>
                </div>
            </div>
            <div className="p-2 bg-gray-800/75 rounded-b">
                {additionalDetails && (
                    <div className="grid grid-cols-3 bg-gray-700 rounded p-2">
                        <div>
                            <h3>Debug</h3>
                        </div>
                        <div className="col-span-2">
                            <p>
                                <b>NodeID:</b> {nodeId}
                            </p>
                            <p>
                                <b>Type:</b> {data.resourceState.type}
                            </p>
                        </div>
                    </div>
                )}

                <div className="relative">
                    <Handle
                        className="source-handle"
                        type="source"
                        position={Position.Right}
                        id={globalResource.name}
                        style={{
                            width: '20px',
                            height: '50px',
                            // borderRadius: '0px',
                            borderRadius: '0px 10px 10px 0px',
                            right: '-28px',
                        }}
                        // isValidConnection={(connection: Connection) => {
                        //     return (
                        //         connection.targetHandle?.includes(
                        //             globalResource.name,
                        //         ) || false
                        //     );
                        // }}
                    />

                    {data.resourceState.keys.map((x, i) => {
                        return (
                            <div
                                className="border-b last:border-none p-2 first:pt-0"
                                key={x.id}
                            >
                                <ResourceKeyDecider
                                    keyState={x}
                                    globalKey={globalResource.keys.find(
                                        (gk) => gk.name === x.name,
                                    )}
                                    onChange={(name, value, type?: string) =>
                                        updateKey(
                                            dispatch,
                                            nodeId,
                                            name,
                                            value,
                                            type,
                                        )
                                    }
                                />
                            </div>
                        );
                    })}
                </div>

                {!!pillBtnsArr.length && (
                    <div className="mx-auto w-full max-w-md rounded-2xl pt-2">
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-2 py-1 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                        <span>Additional Keys</span>
                                        <ChevronUpIcon
                                            className={`${
                                                open
                                                    ? 'rotate-180 transform'
                                                    : ''
                                            } h-5 w-5 text-purple-500`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="p-2 text-sm text-gray-500 flex flex-wrap justify-center">
                                        {pillBtnsArr.length ? (
                                            pillBtnsArr
                                        ) : (
                                            <p>
                                                No additional arguments
                                                available.
                                            </p>
                                        )}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(ResourceNode);
