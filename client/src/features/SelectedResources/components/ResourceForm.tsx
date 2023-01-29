import { IResourceState } from '../../../interfaces/IResourceState';
import resourceLookup from '../../../resources/ResourceLookup';
import ResourceFormInput from './ResourceFormInput';

const ResourceForm = ({ resource }: { resource: IResourceState }) => {
    const globalResource = resourceLookup.find((x) => x.name === resource.type);

    if (!globalResource) {
        return <p>Error: globalResource is not defined {globalResource}</p>;
    }

    return (
        <div className="bg-gray-300 m-2 p-2 rounded-lg">
            <h3 className="text-xl text-terraform-purple">
                {globalResource.display_name}
            </h3>
            {resource.keys.map((x) => (
                <ResourceFormInput
                    key={x.name}
                    keyState={x}
                    resourceState={resource}
                />
            ))}
        </div>
    );
};

export default ResourceForm;
