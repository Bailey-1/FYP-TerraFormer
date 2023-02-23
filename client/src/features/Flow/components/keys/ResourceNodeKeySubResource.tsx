import { IResourceKeyResourceState } from '../../../../interfaces/IResourceState';
import { IResourceKeySubResource } from '../../../../interfaces/IResourceObject';
import { Handle, Position, useNodeId } from 'reactflow';
import React from 'react';

const ResourceNodeKeySubResource = ({
    keyState,
    globalKey,
    onChange,
}: {
    keyState: IResourceKeyResourceState;
    globalKey: IResourceKeySubResource;
    onChange(name: string, value: string): void;
}) => {
    const nodeId = useNodeId();

    return (
        <div className="relative">
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
        </div>
    );
};

export default ResourceNodeKeySubResource;
