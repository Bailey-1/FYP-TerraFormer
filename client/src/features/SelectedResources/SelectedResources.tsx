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
            {resource.length ? (
                resource.map((x) => (
                    <ResourceForm
                        key={x.data.state.id}
                        resource={x.data.state}
                        onDelete={() => onDelete(x.data.state.id)}
                    />
                ))
            ) : (
                <div className="flex h-screen">
                    <div className="m-auto p-4 bg-gray-200 rounded-2xl">
                        <p className="text-2xl text-terraform-purple content-center">
                            Add a resource from the left column to begin!
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default SelectedResources;
