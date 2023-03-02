import React from 'react';
import {
    IResourceKeySelect,
    IResourceKeyState,
} from '@bailey-1/terraformwebapp-common';

const ResourceNodeKeySelect = ({
    keyState,
    globalKey,
    onChange,
}: {
    keyState: IResourceKeyState;
    globalKey: IResourceKeySelect;
    onChange(name: string, value: string): void;
}) => {
    return (
        <div className="flex p-1 relative grid grid-cols-3">
            <div className="col-span-1 text-gray-300">
                <p>{globalKey.display_name}</p>
            </div>
            <div className="col-span-2">
                <select className="nodrag w-full p-0 text-gray-800">
                    {globalKey.options.sort().map((x) => (
                        <option key={x} value={x}>
                            {x}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ResourceNodeKeySelect;
