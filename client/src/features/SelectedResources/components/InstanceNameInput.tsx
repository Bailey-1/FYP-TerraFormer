import { IResourceState } from '../../../interfaces/IResourceState';
import { useDispatch, useSelector } from 'react-redux';
import { updateResourceInstanceName } from '../../ResourceSlice';
import { useState } from 'react';
import { RootState } from '../../../store/store';

const InstanceNameInput = ({ resource }: { resource: IResourceState }) => {
    const [isValid, setIsValid] = useState(true);
    const dispatch = useDispatch();

    const onChange = (name: string) => {
        dispatch(updateResourceInstanceName({ id: resource.id, name }));
    };

    const resources = useSelector(
        (state: RootState) => state.resources.resources,
    );

    return (
        <>
            <input
                value={resource.instance_name}
                onChange={(e) => onChange(e.target.value)}
                className="ml-2"
            />
            {resource.instance_name_valid ? (
                <p className="ml-2">✅</p>
            ) : (
                <p className="ml-2">❌</p>
            )}
        </>
    );
};

export default InstanceNameInput;
