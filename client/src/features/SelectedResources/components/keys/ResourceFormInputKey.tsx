import { IResourceKey } from '../../../../interfaces/IResourceObject';
import { useState } from 'react';
import { IResourceKeyState } from '../../../../interfaces/IResourceState';

const ResourceFormInputKey = ({
    keyState,
    globalKey,
    updateKey,
}: {
    keyState: IResourceKeyState;
    globalKey: IResourceKey;
    updateKey(name: string, value: string): void;
}) => {
    const [touched, setTouched] = useState(false);

    return (
        <input
            value={keyState.value}
            onChange={(e) => {
                updateKey(keyState.name, e.target.value);
            }}
            className={
                touched && !keyState.valid
                    ? 'border border-2 border-red-600'
                    : 'border border-2 border-gray-600'
            }
            onBlur={() => setTouched(true)}
        />
        // {touched && !keyState.valid && (
        //     <p className="text-red-600">{globalKey.validation_message}</p>
        // )}
    );
};

export default ResourceFormInputKey;
