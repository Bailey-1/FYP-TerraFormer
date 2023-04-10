import React from 'react';
import {
    IResourceKeySelect,
    IResourceKeyState,
} from '@bailey-1/terraformwebapp-common';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

const ResourceNodeKeySelect = ({
    keyState,
    globalKey,
    onChange,
}: {
    keyState: IResourceKeyState;
    globalKey: IResourceKeySelect;
    onChange(name: string, value: string): void;
}) => {
    const additionalDetails = useSelector(
        (state: RootState) => state.settings.additionalDetails,
    );

    return (
        <div>
            <div className="p-1 relative grid grid-cols-3">
                <div className="col-span-1 text-gray-300">
                    <p>{globalKey.display_name}</p>
                </div>
                <div className="col-span-2">
                    <select
                        className="nodrag w-full p-1 text-gray-800"
                        onChange={(e) =>
                            onChange(keyState.name, e.target.value)
                        }
                    >
                        {globalKey.options.sort().map((x) => (
                            <option key={x} value={x}>
                                {x}
                            </option>
                        ))}
                    </select>
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

export default ResourceNodeKeySelect;
