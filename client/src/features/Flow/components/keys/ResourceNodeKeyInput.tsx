import React, { useEffect } from 'react';
import {
    IResourceKey,
    IResourceKeyState,
} from '@bailey-1/terraformwebapp-common';

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

    useEffect(() => {
        const getData = setTimeout(() => {
            onChange(keyState.name, value);
        }, 1000);

        return () => clearTimeout(getData);
    }, [value]);

    return (
        <div className="flex p-1 relative grid grid-cols-3">
            <div className="col-span-1 text-gray-400">
                <p>{globalKey.display_name}:</p>
            </div>
            <div className="col-span-2">
                <input
                    type="text"
                    className="nodrag p-0 text-gray-800"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    );
};

export default ResourceNodeKeyInput;
