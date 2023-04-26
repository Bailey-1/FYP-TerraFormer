import {
    IResourceKeyResource,
    IResourceKeyResourceState,
    IResourceKeyState,
} from '@bailey-1/terraformwebapp-common';
import { Connection, Handle, Position, useNodeId } from 'reactflow';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import React from 'react';
import resourceLookup from '../../../../resources/ResourceLookup';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

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
                    `${nodeId}---${globalKey.name}---${keyState.id}`,
        ),
    );

    // Find the value of the key linked to this input
    const sourceNode = useSelector((state: RootState) =>
        state.flow.nodes.find((x) => x.id === edgeData?.source),
    );

    const sourceKey = sourceNode?.data.resourceState.keys.find(
        (x: IResourceKeyState) => x.name === edgeData?.data?.value,
    );

    const resourceNode = resourceLookup.find(
        (x) => x.name === sourceNode?.data.resourceState.type,
    );

    const resourceAttributes = resourceNode?.attributes || [];

    return (
        <div className="p-1 relative grid grid-cols-3">
            {/*<h2>{globalKey.name}</h2>*/}
            <Handle
                className="target-handle"
                type="target"
                position={Position.Left}
                id={`${nodeId}---${globalKey.name}---${keyState.id}`}
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
            <div className="col-span-1 text-gray-300">
                <p>{globalKey.display_name}:</p>
            </div>
            <div className="col-span-2">
                {!!sourceNode ? (
                    <span className="flex rounded-md shadow-sm">
                        <p className="items-center rounded-l-md border border-gray-300 p-1">
                            {sourceNode.data.resourceState.type}
                        </p>
                        <p className="items-center border border-gray-300 p-1 -ml-px">
                            {sourceNode.data.resourceState.id}
                        </p>
                        <select
                            className="nodrag -ml-px block w-full rounded-l-none rounded-r-md border-1 border-white p-1 pr-10 text-gray-300 bg-gray-600 rounded focus:ring-0"
                            onChange={(e) =>
                                onChange(
                                    globalKey.name,
                                    `$${sourceNode.data.resourceState.type}.${sourceNode.data.resourceState.id}.${e.target.value}`,
                                )
                            }
                        >
                            {resourceAttributes.map((x) => (
                                <option key={x} value={x}>
                                    {x}
                                </option>
                            ))}
                        </select>
                    </span>
                ) : (
                    <p>
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500 ml-auto mr-auto" />
                    </p>
                )}
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
