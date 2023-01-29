import { resources } from '../../resources/TestComponent';
import ResourceElement from './components/ResourceElement';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addResource } from '../ResourceSlice';
import ResourceLookup from '../../resources/ResourceLookup';

const ResourceList = ({ filter }: { filter: string | null }) => {
    const resourceList: { name: string; docs: string }[] = [];

    Object.keys(resources).forEach((key) => {
        const resource = resources[key as keyof typeof resources];

        if (filter && resource.provider !== filter && filter !== 'all') {
            return;
        }

        resourceList.push(resource);
    });

    const dispatch = useDispatch();

    const resource = useSelector(
        (state: RootState) => state.resources.resources,
    );

    return (
        <div>
            {resourceList.map((x) => (
                <ResourceElement
                    resource={x}
                    key={x.name}
                    addResource={() => {
                        dispatch(
                            addResource({
                                id: resource.length,
                                type: x.name,
                                keys:
                                    ResourceLookup.find(
                                        (y) => y.name === x.name,
                                    )?.keys.map((key) => {
                                        return {
                                            name: key.name,
                                            value: key.value,
                                        };
                                    }) || [],
                            }),
                        );
                    }}
                />
            ))}
        </div>
    );
};

export default ResourceList;
