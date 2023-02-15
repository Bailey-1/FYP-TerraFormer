import { Handle, Position, useNodeId } from 'reactflow';
import React from 'react';
import {
    IResourceKeyState,
    IResourceState,
} from '../../../../interfaces/IResourceState';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

const ResourceNodeKeyInput = ({
    keyState,
    resourceState,
    onChange,
}: {
    keyState: IResourceKeyState;
    resourceState: IResourceState;
    onChange: (name: string, value: string) => void;
}) => {
    const nodeId = useNodeId();

    // Find any edges which link to this input
    const edgeData = useSelector((state: RootState) =>
        state.flow.edges.find(
            (x) => x.target === nodeId && x.targetHandle === keyState.id,
        ),
    );

    // Find the value of the key linked to this input
    const sourceVal = useSelector(
        (state: RootState) =>
            state.flow.nodes
                .find((x) => x.id === edgeData?.source)
                ?.data.resourceState.keys.find(
                    (x: IResourceKeyState) => x.id === edgeData?.sourceHandle,
                ).value,
    );

    return (
        <div className="flex p-1 relative grid grid-cols-3">
            <p>{sourceVal}</p>
            <Handle
                type="target"
                position={Position.Left}
                id={keyState.id}
                style={{
                    background: '#555',
                    width: '15px',
                    backgroundColor: 'lightblue',
                    height: '15px',
                    borderRadius: '10px',
                    left: '-15px',
                }}
            />
            <div className="col-span-1">
                <p>{keyState.name}</p>
            </div>
            <div className="col-span-2">
                <input
                    type="text"
                    style={{ padding: '0px' }}
                    className="nodrag"
                    value={keyState.value}
                    onChange={(e) => onChange(keyState.name, e.target.value)}
                />
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id={keyState.id}
                style={{
                    background: '#555',
                    width: '15px',
                    backgroundColor: 'pink',
                    height: '15px',
                    borderRadius: '10px',
                    right: '-15px',
                }}
            />
        </div>
    );
};

export default ResourceNodeKeyInput;
