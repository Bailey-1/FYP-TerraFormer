import { resources } from '../../resources/TestComponent';

const ResourceElement = ({
    resource,
}: {
    resource: { name: string; docs: string };
}) => {
    return (
        <div className="p-2 m-2 bg-gray-200">
            <h3>{resource.name}</h3>
            <p>{resource.docs}</p>
        </div>
    );
};

const ResourceList = ({ filter }: { filter: string | null }) => {
    const resourceList: { name: string; docs: string }[] = [];

    Object.keys(resources).forEach((key) => {
        const resource = resources[key as keyof typeof resources];

        if (filter && resource.provider !== filter && filter !== 'all') {
            return;
        }

        resourceList.push(resource);
    });

    return (
        <div>
            {resourceList.map((x) => (
                <ResourceElement resource={x} key={x.name} />
            ))}
        </div>
    );
};

export default ResourceList;
