import {
    IResourceKeyState,
    IResourceState,
} from '../../../interfaces/IResourceState';
import { useDispatch } from 'react-redux';
import { updateResourceKey } from '../../ResourceSlice';
import { IResourceKey } from '../../../interfaces/IResourceObject';
import resourceLookup from '../../../resources/ResourceLookup';
import { useState } from 'react';

const ResourceFormInput = ({
    keyState,
    resourceState,
}: {
    keyState: IResourceKeyState;
    resourceState: IResourceState;
}) => {
    const dispatch = useDispatch();

    const [touched, setTouched] = useState(false);

    const globalResource = resourceLookup.find(
        (x) => x.name === resourceState.type,
    )!;

    const globalKey = globalResource.keys.find(
        (x: IResourceKey) => x.name === keyState.name,
    )!;

    const updateKey = (name: string, value: string) => {
        dispatch(
            updateResourceKey({
                id: resourceState.id,
                key: name,
                value,
                valid: globalKey?.validation(value) || false,
            }),
        );
    };

    return (
        <div className="m-1 p-1">
            <label className="mr-2">{keyState.name}</label>
            <input
                value={keyState.value}
                onChange={(e) => {
                    updateKey(keyState.name, e.target.value);
                }}
                className={
                    touched && !keyState.valid
                        ? 'border border-2 border-red-600'
                        : ''
                }
                onBlur={() => setTouched(true)}
            />
            {touched && !keyState.valid && (
                <p className="text-red-600">{globalKey.validation_message}</p>
            )}
        </div>
    );
};

export default ResourceFormInput;