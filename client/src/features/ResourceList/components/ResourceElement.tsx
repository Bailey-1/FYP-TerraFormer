// TODO: Make this resource collapsable to hide details
import {
    IResourceKeyBlock,
    IResourceObject,
} from '@bailey-1/terraformwebapp-common';
import onDragStart from '../../../events/ResourceDragAndDrop';
import { useDispatch, useSelector } from 'react-redux';
import { addNode, addSubNode } from '../../FlowSlice';
import getNestedBlockKeys from '../../../utility/GetNestedBlockKeys';
import providerColours from '../../../resources/ProviderColours';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { RootState } from '../../../store/store';
import HighlightedText from '../../../components/HighlightedText';

const ResourceElement = ({
    resource,
    isCollapsed,
    setIsCollapsed,
}: {
    resource: IResourceObject;
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}) => {
    const dispatch = useDispatch();
    const searchTerm = useSelector(
        (state: RootState) => state.resourceList.searchTerm,
    );

    const searchArgs = searchTerm
        .toLowerCase()
        .trim()
        .split(' ')
        .filter((x) => x);

    const addResource = () => {
        dispatch(
            addNode({
                name: resource.name,
                position: { x: 0, y: 0 },
            }),
        );
    };

    const addBlock = (sub: IResourceKeyBlock) => {
        dispatch(
            addSubNode({
                name: sub.name,
                parentResourceName: resource.name,
                position: { x: 0, y: 0 },
            }),
        );
    };

    const allBlockKeys = getNestedBlockKeys(resource.keys);

    return (
        <div
            className="flex flex-row bg-gray-800 m-2 rounded-lg hover:bg-gray-700 border border-gray-300 hover:border-gray-400 cursor-grab"
            onDragStart={(event) =>
                onDragStart(event, 'resource', resource.name)
            }
            draggable
            data-cy={`draggable-${resource.name}`}
            data-cy-type="primaryResource"
            onClick={() => {
                setIsCollapsed(!isCollapsed);
            }}
        >
            <div className="grow">
                <div
                    className={`p-2 flex  justify-between items-center ${
                        providerColours[resource.provider]?.background
                    } ${isCollapsed ? 'rounded-lg' : 'rounded-t-lg'}`}
                >
                    <span className="inline-flex">
                        <ChevronUpIcon
                            className={`h-7 w-7 mr-2 text-gray-400 ${
                                !isCollapsed ? 'rotate-180' : ''
                            }`}
                        />
                        <h3
                            className={`text-xl ${
                                providerColours[resource.provider]?.foreground
                            }`}
                        >
                            {resource.display_name}
                        </h3>
                    </span>
                    <button
                        className="bg-green-600 m-2 p-2 px-4 text-gray-200 rounded-lg hover:bg-green-700 text-2xl"
                        onClick={addResource}
                        data-cy={`add-${resource.name}`}
                        data-cy-type="primaryResourceAddButton"
                    >
                        +
                    </button>
                </div>
                <div className={`p-2 m-2 ${isCollapsed ? 'hidden' : ''}`}>
                    {/*<a*/}
                    {/*    className="underline text-gray-500"*/}
                    {/*    href={resource.docs.terraform}*/}
                    {/*    target="_blank"*/}
                    {/*    rel="noreferrer"*/}
                    {/*>*/}
                    {/*    {resource.docs.terraform}*/}
                    {/*</a>*/}
                    <p className="text-gray-300">
                        {/*{resource.description.small}*/}
                        <HighlightedText
                            text={resource.description.small}
                            searchArr={searchArgs}
                        />
                    </p>
                    {allBlockKeys.map((sub: IResourceKeyBlock) => {
                        return (
                            <div
                                className="flex justify-between m-2 p-2 items-center border border-l-4 bg-gray-800 hover:bg-gray-700"
                                draggable
                                key={sub.name}
                                onDragStart={(event) => {
                                    event.stopPropagation();
                                    onDragStart(
                                        event,
                                        'block',
                                        `${resource.name}/${sub.name}`,
                                    );
                                }}
                                data-cy={`draggable-${resource.name}-${sub.name}`}
                            >
                                <h3 className="text-l text-gray-200">
                                    {sub.display_name}
                                </h3>
                                <button
                                    className="bg-yellow-600 p-2 px-4 text-gray-200 rounded hover:bg-yellow-700"
                                    onClick={() => addBlock(sub)}
                                    data-cy={`addBlock-${resource.name}-${sub.name}`}
                                    data-cy-type="blockAddButton"
                                >
                                    +
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ResourceElement;
