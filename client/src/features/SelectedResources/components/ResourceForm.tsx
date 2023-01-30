import { IResourceState } from '../../../interfaces/IResourceState';
import resourceLookup from '../../../resources/ResourceLookup';
import ResourceFormInput from './ResourceFormInput';
import InstanceNameInput from './InstanceNameInput';

const ResourceForm = ({
    resource,
    onDelete,
}: {
    resource: IResourceState;
    onDelete: () => void;
}) => {
    const globalResource = resourceLookup.find((x) => x.name === resource.type);

    if (!globalResource) {
        return <p>Error: globalResource is not defined {globalResource}</p>;
    }

    return (
        <div className="bg-gray-300 m-2 p-2 rounded-lg">
            <h3 className="text-xl text-terraform-purple">
                {globalResource.display_name} -{' '}
                <InstanceNameInput resource={resource} />
            </h3>
            {resource.keys.map((x) => (
                <ResourceFormInput
                    key={x.name}
                    keyState={x}
                    resourceState={resource}
                />
            ))}
            <button
                onClick={onDelete}
                className="bg-red-700 text-gray-200 p-2 px-4 rounded-lg hover:bg-red-800 border border-red-900"
            >
                Delete
            </button>
        </div>
    );
};

export default ResourceForm;
