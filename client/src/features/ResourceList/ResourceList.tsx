import ResourceElement from './components/ResourceElement';
import { useDispatch } from 'react-redux';
import resourceLookup from '../../resources/ResourceLookup';
import { addNode } from '../FlowSlice';

const ResourceList = ({ filter }: { filter: string | null }) => {
    const dispatch = useDispatch();

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
                                addNode({
                                    name: x.name,
                                    position: { x: 0, y: 0 },
                                }),
                            );
                        }}
                    />
                ))}
        </>
    );
};

export default ResourceList;
