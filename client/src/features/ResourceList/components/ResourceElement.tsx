// TODO: Make this resource collapsable to hide details
const ResourceElement = ({
    resource,
    addResource,
}: {
    resource: { name: string; docs: string };
    addResource: () => void;
}) => {
    return (
        <div className="flex flex-row bg-gray-200 m-2 rounded-lg hover:bg-gray-300 border border-gray-300 hover:border-gray-400">
            <div className="p-2 m-2 grow">
                <div className="flex justify-between">
                    <h3 className="text-xl">{resource.name}</h3>
                    <button
                        className="bg-green-600 p-2 px-4 text-gray-200 rounded-lg border border-green-900 hover:bg-green-700"
                        onClick={addResource}
                    >
                        +
                    </button>
                </div>
                <a className="underline" href="https://google.com">
                    {resource.docs}
                </a>
                <p>
                    Description of the resource. Description of the resource.
                    Description of the resource.
                </p>
            </div>
            {/*<button*/}
            {/*    className="bg-green-600 p-3 m-2 px-4 text-2xl font-bold text-gray-200 rounded-lg border border-green-900 hover:bg-green-700"*/}
            {/*    onClick={addResource}*/}
            {/*>*/}
            {/*    +*/}
            {/*</button>*/}
        </div>
    );
};

export default ResourceElement;
