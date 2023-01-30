import { IResourceState } from '../../../interfaces/IResourceState';
import { useDispatch } from 'react-redux';
import { updateResourceInstanceName } from '../../ResourceSlice';

const InstanceNameInput = ({ resource }: { resource: IResourceState }) => {
    const dispatch = useDispatch();

    const onChange = (name: string) => {
        dispatch(updateResourceInstanceName({ id: resource.id, name }));
    };

    return (
        <input
            value={resource.instance_name}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default InstanceNameInput;
