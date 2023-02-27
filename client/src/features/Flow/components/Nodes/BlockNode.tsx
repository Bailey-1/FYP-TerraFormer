import React, { memo } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Handle, Position, useNodeId, useUpdateNodeInternals } from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import { onNodesChange, updateNodeKey } from '../../../FlowSlice';
import resourceLookup from '../../../../resources/ResourceLookup';
import { RootState } from '../../../../store/store';
import { IBlockState } from '../../../../interfaces/IBlockState';
import { IResourceKeyBlock } from '../../../../interfaces/IResourceObject';
import ResourceKeyDecider from '../ResourceKeyDecider';

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

    if (!globalResource || !globalBlock) {
        return <p>Error: globalResource/subResourceType is not defined</p>;
    }

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

                {globalBlock.block.keys.map((x, i) => {
                    return (
                        <ResourceKeyDecider
                            key={x.name}
                            keyState={
                                data.resourceState.keys.find(
                                    (z) => z.name === x.name,
                                )!
                            }
                            globalKey={x}
                            onChange={updateKey}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default memo(BlockNode);
