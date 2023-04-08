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

    const additionalDetails = useSelector(
        (state: RootState) => state.settings.additionalDetails,
    );

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
    const sourceNode = useSelector((state: RootState) =>
        state.flow.nodes.find((x) => x.id === edgeData?.source),
    );

    const sourceKey = sourceNode?.data.resourceState.keys.find(
        (x: IResourceKeyState) => x.name === edgeData?.data?.value,
    );

    return (
        <div className="relative">
            {/*<h2>{globalKey.name}</h2>*/}
            <Handle
                className="target-handle"
                type="target"
                position={Position.Left}
                id={`${globalKey.resource_type}---${globalKey.resource_property}---${keyState.id}`}
                style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '10px',
                    left: '-22px',
                    bottom: 0,
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
                <p className="text-gray-300 pl-2">
                    {!!sourceKey ? sourceKey?.value : '*COMPUTED*'}
                </p>
                <p
                    className="pl-2"
                    title="Checks if the linked property from another resource matches the expected name. This might be fine depending on what you are doing."
                >
                    {edgeData?.data?.value === globalKey.resource_property
                        ? '✅'
                        : '⚠️'}
                </p>
            </div>
            {additionalDetails && (
                <div className="grid grid-cols-3 bg-gray-700 rounded p-2">
                    <div>
                        <h3>Debug</h3>
                    </div>
                    <div className="col-span-2">
                        <p>
                            <b>KeyID:</b> {keyState.id}
                        </p>
                        <p title="Actual link used in the Terraform file.">
                            {`@${sourceNode?.data.resourceState.type}`}.
                            {sourceNode?.data.resourceState.id}.
                            {sourceKey?.name}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResourceNodeKeyResource;
