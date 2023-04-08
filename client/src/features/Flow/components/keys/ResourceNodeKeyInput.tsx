import React, { useEffect } from 'react';
import {
    IResourceKey,
    IResourceKeyState,
} from '@bailey-1/terraformwebapp-common';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { Handle, Position } from 'reactflow';

const ResourceNodeKeyInput = ({
    keyState,
    onChange,
    globalKey,
}: {
    keyState: IResourceKeyState;
    onChange: (name: string, value: string) => void;
    globalKey: IResourceKey;
}) => {
    const [value, setValue] = React.useState(keyState.value);
    const additionalDetails = useSelector(
        (state: RootState) => state.settings.additionalDetails,
    );

    useEffect(() => {
        const getData = setTimeout(() => {
            onChange(keyState.name, value);
        }, 1000);

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
                <div className="col-span-1 text-gray-400">
                    <p>{globalKey.display_name}:</p>
                </div>
                <div className="col-span-2">
                    <input
                        type="text"
                        className="nodrag p-0 text-gray-800 border border-red-400 bg-red-100"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <p
                        className="text-sm text-red-400"
                        style={{ maxWidth: '200px' }}
                    >
                        Name can only contain a-z, A-Z, 0-9, 0-9, 0-9, 0-9, 0-9,
                    </p>
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
