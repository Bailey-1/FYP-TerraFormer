import React, { memo } from 'react';
import { ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Handle, Position, useNodeId, useUpdateNodeInternals } from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import {
    addNewNodeKey,
    onNodesChange,
    updateNodeKey,
} from '../../../FlowSlice';
import resourceLookup from '../../../../resources/ResourceLookup';
import { RootState } from '../../../../store/store';
import {
    IBlockState,
    IResourceKeyBlock,
    IResourceKeys,
} from '@bailey-1/terraformwebapp-common';
import ResourceKeyDecider from '../ResourceKeyDecider';
import { Disclosure } from '@headlessui/react';
import PillButton from '../../../../components/controls/PillBtn';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const BlockNode = ({
    id,
    data,
    selected,
}: {
    id: string;
    data: { resourceState: IBlockState };
    selected: boolean;
}) => {
    const dispatch = useDispatch();
    const nodeId = useNodeId();
    const updateNodeInternals = useUpdateNodeInternals();

    const globalResource = resourceLookup.find(
        (x) => x.name === data.resourceState.parent_type,
    );

    const globalBlock = globalResource?.keys
        .filter((x) => x.type === 'block')
        .find((x) => x.name === data.resourceState.type) as IResourceKeyBlock;

    const additionalDetails = useSelector(
        (state: RootState) => state.settings.additionalDetails,
    );

    const onClick = (val: string) => {
        // setKeys((prevState) => [...prevState, val]);

        if (nodeId) {
            updateNodeInternals(nodeId);
        }
    };

    const updateKey = (name: string, value: string | string[]) => {
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

    if (!globalResource || !globalBlock) {
        return <p>Error: globalResource/subResourceType is not defined</p>;
    }

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

    const pillBtnsArr = globalBlock.block.keys
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
            className={`border text-gray-300 rounded-t-xl bg-gray-800 ${
                selected ? 'border-gray-400' : 'border-transparent'
            }`}
        >
            {/* Completed resource node */}
            <Handle
                type="source"
                position={Position.Right}
                id={globalBlock.name}
                style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '10px',
                    right: '-15px',
                }}
            />
            <div className={`flex justify-between p-2 rounded-t-xl`}>
                <h1 className={`text-xl text-gray-200`}>
                    {globalBlock.display_name}
                </h1>
                <div>
                    <button className="h-8 nodrag">
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
                        <ResourceKeyDecider
                            key={x.name}
                            keyState={
                                data.resourceState.keys.find(
                                    (z) => z.name === x.name,
                                )!
                            }
                            globalKey={globalBlock.block.keys.find(
                                (gk) => gk.name === x.name,
                            )}
                            onChange={updateKey}
                        />
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

export default memo(BlockNode);
