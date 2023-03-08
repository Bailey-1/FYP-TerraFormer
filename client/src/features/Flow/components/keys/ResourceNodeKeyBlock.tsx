import {
    IResourceKeyBlock,
    IResourceKeyBlockState,
} from '@bailey-1/terraformwebapp-common';
import { Handle, Position, useNodeId } from 'reactflow';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { removeNodeKey } from '../../../FlowSlice';
import PillButton from '../../../../components/controls/PillBtn';

const ResourceNodeKeyBlock = ({
    keyState,
    globalKey,
    onChange,
}: {
    keyState: IResourceKeyBlockState;
    globalKey: IResourceKeyBlock;
    onChange(name: string, value: string[]): void;
}) => {
    const nodeId = useNodeId();

    const dispatch = useDispatch();

    // Find any edges which link to this input
    const edgeData = useSelector((state: RootState) =>
        state.flow.edges.filter(
            (x) => x.target === nodeId && x.targetHandle === keyState.id,
        ),
    );

    const connectedBlockIds = edgeData.map((x) => x.source);

    if (!nodeId) {
        return <p>Error: NodeID does not exist</p>;
    }

    const removeKey = () => {
        dispatch(
            removeNodeKey({
                nodeId: nodeId,
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
                id={keyState.id}
                className="bg-blue-300"
                style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '10px',
                    left: '-15px',
                }}
            />
            <p className="pl-2">{!!edgeData.length ? '✅' : '❌'}</p>
            <p>{JSON.stringify(connectedBlockIds)}</p>
            <PillButton className="" onClick={() => removeKey()}>
                Remove
            </PillButton>
        </div>
    );
};

export default ResourceNodeKeyBlock;
