import React, { useEffect, useState } from 'react';
import {
    IResourceKey,
    IResourceKeyState,
    IResourceKeyStateTypes,
} from '@bailey-1/terraformwebapp-common';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { Handle, Position, useNodeId } from 'reactflow';
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/20/solid';
import resourceLookup from '../../../../resources/ResourceLookup';

const ResourceNodeKeyInput = ({
    keyState,
    onChange,
    globalKey,
}: {
    keyState: IResourceKeyState;
    onChange: (name: string, value: string, type?: string) => void;
    globalKey: IResourceKey;
}) => {
    const [value, setValue] = useState(keyState.value);

    const [touched, setTouched] = useState(false);
    const nodeId = useNodeId();

    const additionalDetails = useSelector(
        (state: RootState) => state.settings.additionalDetails,
    );

    useEffect(() => {
        const getData = setTimeout(() => {
            onChange(keyState.name, value);
        }, 500);

        return () => clearTimeout(getData);
    }, [value]);

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

    const sourceKey: IResourceKeyStateTypes | undefined =
        sourceNode?.data.resourceState.keys.find(
            (x: IResourceKeyState) =>
                x.name === keyState.value.split('.').pop(), // lol this is bad
        );

    useEffect(() => {
        console.log('Key Changed');
    }, [sourceKey?.value]);

    const resourceNode = resourceLookup.find(
        (x) => x.name === sourceNode?.data.resourceState.type,
    );

    const resourceAttributes = resourceNode?.attributes || [];

    return (
        <div className="relative">
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
            />
            <div className="p-1 grid grid-cols-3">
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
                                        'resource',
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
                        <div className="relative w-full">
                            <input
                                type="text"
                                className={
                                    touched && !keyState.valid
                                        ? 'w-full nodrag p-1 text-gray-300 border border-red-400 bg-gray-600 rounded focus:ring-0 focus:border-terraform-purple-500'
                                        : 'w-full nodrag p-1 text-gray-300 border bg-gray-600 rounded focus:ring-0 focus:border-terraform-purple-500'
                                }
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onBlur={() => setTouched(true)}
                            />
                            {touched && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    {keyState.valid ? (
                                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {touched && !keyState.valid && (
                        <p
                            className="text-sm text-red-400"
                            style={{ maxWidth: '200px' }}
                        >
                            {globalKey.validation_message}
                        </p>
                    )}
                </div>
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResourceNodeKeyInput;
