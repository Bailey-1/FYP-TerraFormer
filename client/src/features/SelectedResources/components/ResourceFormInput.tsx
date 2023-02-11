import {
    IResourceKeyState,
    IResourceState,
} from '../../../interfaces/IResourceState';
import { useDispatch, useSelector } from 'react-redux';
import { updateResourceKey } from '../../ResourceSlice';
import resourceLookup from '../../../resources/ResourceLookup';
import ResourceFormInputRef from './keys/ResourceFormInputRef';
import { RootState } from '../../../store/store';
import ResourceFormSelectKey from './keys/ResourceFormSelectKey';
import ResourceFormInputKey from './keys/ResourceFormInputKey';

const ResourceFormInput = ({
    keyState,
    resourceState,
}: {
    keyState: IResourceKeyState;
    resourceState: IResourceState;
}) => {
    const dispatch = useDispatch();

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
                <ResourceFormInputKey
                    globalKey={globalKey}
                    keyState={keyState}
                    updateKey={updateKey}
                />
            )}

            {globalKey.type === 'select' && (
                <ResourceFormSelectKey
                    keyState={keyState}
                    globalKey={globalKey}
                    updateKey={updateKey}
                />
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
        </div>
    );
};

export default ResourceFormInput;
