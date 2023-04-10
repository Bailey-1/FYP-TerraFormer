import React, { useEffect, useState } from 'react';
import {
    IResourceKey,
    IResourceKeyState,
} from '@bailey-1/terraformwebapp-common';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { Handle, Position } from 'reactflow';
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/20/solid';

const ResourceNodeKeyInput = ({
    keyState,
    onChange,
    globalKey,
}: {
    keyState: IResourceKeyState;
    onChange: (name: string, value: string) => void;
    globalKey: IResourceKey;
}) => {
    const [value, setValue] = useState(keyState.value);

    const [touched, setTouched] = useState(false);

    const additionalDetails = useSelector(
        (state: RootState) => state.settings.additionalDetails,
    );

    useEffect(() => {
        const getData = setTimeout(() => {
            onChange(keyState.name, value);
        }, 500);

        return () => clearTimeout(getData);
    }, [value]);

    return (
        <div className="relative">
            <Handle
                className="target-handle"
                type="target"
                position={Position.Left}
                id={`test`}
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
                    <div className="relative w-full">
                        <input
                            type="text"
                            className={
                                touched && !keyState.valid
                                    ? 'w-full nodrag p-1 text-gray-800 border border-red-400 bg-red-100'
                                    : 'w-full nodrag p-1 text-gray-800 border'
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
