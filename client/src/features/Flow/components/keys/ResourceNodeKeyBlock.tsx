import { IResourceKeyResourceState } from '../../../../interfaces/IResourceState';
import { IResourceKeyBlock } from '../../../../interfaces/IResourceObject';
import { Handle, Position, useNodeId } from 'reactflow';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { IBlockState } from '../../../../interfaces/IBlockState';
import { removeNodeKey } from '../../../FlowSlice';
import PillButton from '../../../../components/controls/PillBtn';

const ResourceNodeKeyBlock = ({
    keyState,
    globalKey,
    onChange,
}: {
    keyState: IResourceKeyResourceState;
    globalKey: IResourceKeyBlock;
    onChange(name: string, value: string): void;
}) => {
    const nodeId = useNodeId();
    const dispatch = useDispatch();

    // Find any edges which link to this input
    const edgeData = useSelector((state: RootState) =>
        state.flow.edges.find(
            (x) =>
                x.target === nodeId && x.targetHandle === `${globalKey.name}`,
        ),
    );

    const sourceVal = useSelector((state: RootState) =>
        state.flow.nodes.find((x) => x.id === edgeData?.source),
    )?.data.resourceState as IBlockState;

    const removeKey = () => {
        dispatch(
            removeNodeKey({
                nodeId: nodeId || '',
                keyId: keyState.id,
            }),
        );
    };

    return (
        <div className="relative flex justify-between">
            <h2>{globalKey.display_name}</h2>
            <Handle
                type="target"
                position={Position.Left}
                id={`${globalKey.name}`}
                className="bg-blue-300"
                style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '10px',
                    left: '-15px',
                }}
            />
            <p className="pl-2">{!!sourceVal ? '✅' : '❌'}</p>
            <PillButton className="" onClick={() => removeKey()}>
                Remove
            </PillButton>
        </div>
    );
};

export default ResourceNodeKeyBlock;
