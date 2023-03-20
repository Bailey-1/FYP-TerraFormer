import ResourceElement from './components/ResourceElement';
import resourceLookup from '../../resources/ResourceLookup';

const ResourceList = ({ filter }: { filter: string | null }) => {
    return (
        <>
            {/*<SearchBar />*/}
            {resourceLookup
                .filter((x) => filter === 'all' || filter === x.provider)
                .map((x) => (
                    <ResourceElement resource={x} key={x.name} />
                ))}
        </>
    );
};

export default ResourceList;
