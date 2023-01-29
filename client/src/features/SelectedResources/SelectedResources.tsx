import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ResourceForm from './components/ResourceForm';

const SelectedResources = () => {
    const dispatch = useDispatch();

    const resource = useSelector(
        (state: RootState) => state.resources.resources,
    );

    return (
        <>
            {resource.map((x) => (
                <ResourceForm key={x.id} resource={x} />
            ))}
        </>
    );
};

export default SelectedResources;
