import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ResourceForm from './components/ResourceForm';
import { deleteResource } from '../ResourceSlice';

const SelectedResources = () => {
    const dispatch = useDispatch();

    const resource = useSelector(
        (state: RootState) => state.resources.resources,
    );

    const onDelete = (id: number) => {
        dispatch(deleteResource({ id }));
    };

    return (
        <>
            {resource.map((x) => (
                <ResourceForm
                    key={x.id}
                    resource={x}
                    onDelete={() => onDelete(x.id)}
                />
            ))}
        </>
    );
};

export default SelectedResources;
