import {
    IResourceKeyState,
    IResourceState,
} from '../../../interfaces/IResourceState';
import { useDispatch, useSelector } from 'react-redux';
import { updateResourceKey } from '../../ResourceSlice';
import resourceLookup from '../../../resources/ResourceLookup';
import { useState } from 'react';
import ResourceFormInputRef from './ResourceFormInputRef';
import { RootState } from '../../../store/store';

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
        (x: any) => x.name === keyState.name,
    )!;

    const updateKey = (name: string, value: string) => {
        dispatch(
            updateResourceKey({
                id: resourceState.id,
                key: name,
                value,
                valid: !!globalKey.validation
                    ? globalKey.validation(value)
                    : true,
            }),
        );
    };

    const allResources = useSelector(
        (state: RootState) => state.resources.resources,
    );

    return (
        <div className="m-2 p-2 bg-gray-100 rounded">
            <div>
                <label className="mr-2">{keyState.name}</label>
            </div>
            {globalKey.type === 'string' && (
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
            )}

            {globalKey.type === 'select' && (
                <select
                    value={keyState.value}
                    onChange={(e) => {
                        updateKey(keyState.name, e.target.value);
                    }}
                >
                    {globalKey.options.sort().map((x) => (
                        <option key={x} value={x}>
                            {x}
                        </option>
                    ))}
                </select>
            )}

            {globalKey.type === 'resource' && (
                <ResourceFormInputRef
                    keyState={keyState}
                    globalKey={globalKey}
                    resourceState={resourceState}
                    options={allResources
                        .filter((x) => x.type === globalKey.resource_type)
                        .sort()}
                />
            )}

            {touched && !keyState.valid && (
                <p className="text-red-600">{globalKey.validation_message}</p>
            )}
        </div>
    );
};

export default ResourceFormInput;
