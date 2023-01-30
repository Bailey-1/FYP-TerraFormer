import ResourceElement from './components/ResourceElement';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addResource } from '../ResourceSlice';
import ResourceLookup from '../../resources/ResourceLookup';
import resourceLookup from '../../resources/ResourceLookup';
import { IResourceKey } from '../../interfaces/IResourceObject';
import { useState } from 'react';

const ResourceList = ({ filter }: { filter: string | null }) => {
    const [currentId, setCurrentId] = useState(0);

    const dispatch = useDispatch();

    const resource = useSelector(
        (state: RootState) => state.resources.resources,
    );

    return (
        <>
            {resourceLookup
                .filter((x) => filter === 'all' || filter === x.provider)
                .map((x) => (
                    <ResourceElement
                        resource={x}
                        key={x.name}
                        addResource={() => {
                            dispatch(
                                addResource({
                                    id: currentId,
                                    type: x.name,
                                    valid: false,
                                    keys:
                                        ResourceLookup.find(
                                            (y) => y.name === x.name,
                                        )?.keys.map((key: IResourceKey) => {
                                            return {
                                                name: key.name,
                                                value: key.value,
                                                valid: false,
                                            };
                                        }) || [],
                                    instance_name: x.name,
                                }),
                            );
                            setCurrentId((prev) => prev + 1);
                        }}
                    />
                ))}
        </>
    );
};

export default ResourceList;
