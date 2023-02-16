import { IResourceKeyState } from '../../../../interfaces/IResourceState';
import { IResourceKeyResource } from '../../../../interfaces/IResourceObject';
import { Handle, Position, useNodeId } from 'reactflow';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import React from 'react';

const ResourceNodeKeyResource = ({
    keyState,
    globalKey,
    onChange,
}: {
    keyState: IResourceKeyState;
    globalKey: IResourceKeyResource;
    onChange(name: string, value: string): void;
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
                    (x: IResourceKeyState) =>
                        x.name === globalKey.resource_property,
                )?.value,
    );

    return (
        <div className="relative">
            <h2>{globalKey.name}</h2>
            <p className="text-gray-300">Linked Value: {sourceVal}</p>
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
            <p>
                {globalKey.resource_type} {globalKey.resource_property}
            </p>
        </div>
    );
};

export default ResourceNodeKeyResource;
