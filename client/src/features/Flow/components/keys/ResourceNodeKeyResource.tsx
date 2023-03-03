import {
    IResourceKeyResource,
    IResourceKeyResourceState,
    IResourceKeyState,
} from '@bailey-1/terraformwebapp-common';
import { Connection, Handle, Position, useNodeId } from 'reactflow';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import React from 'react';

const ResourceNodeKeyResource = ({
    keyState,
    globalKey,
    onChange,
}: {
    keyState: IResourceKeyResourceState;
    globalKey: IResourceKeyResource;
    onChange(name: string, value: string): void;
}) => {
    const nodeId = useNodeId();

    // Find any edges which link to this input
    const edgeData = useSelector((state: RootState) =>
        state.flow.edges.find(
            (x) =>
                x.target === nodeId &&
                x.targetHandle ===
                    `${globalKey.resource_type}---${globalKey.resource_property}---${keyState.id}`,
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
            {/*<h2>{globalKey.name}</h2>*/}
            <Handle
                type="target"
                position={Position.Left}
                id={`${globalKey.resource_type}---${globalKey.resource_property}---${keyState.id}`}
                className="bg-blue-300"
                style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '10px',
                    left: '-15px',
                }}
                isValidConnection={(connection: Connection) => {
                    return (
                        connection.sourceHandle?.includes(
                            globalKey.resource_type,
                        ) || false
                    );
                }}
            />
            <div className="flex">
                <p className="text-gray-400">{globalKey.display_name}:</p>
                <p className="text-gray-300 pl-2">{sourceVal}</p>
                <p
                    className="pl-2"
                    title="Checks if the linked property from another resource matches the expected name. This might be fine depending on what you are doing."
                >
                    {edgeData?.data?.value === globalKey.resource_property
                        ? '✅'
                        : '⚠️'}
                </p>
            </div>
        </div>
    );
};

export default ResourceNodeKeyResource;
