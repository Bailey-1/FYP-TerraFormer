import ResourceElement from './components/ResourceElement';
import resourceLookup, { categories } from '../../resources/ResourceLookup';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ResourceList = ({ filter }: { filter: string | null }) => {
    const searchTerm = useSelector(
        (state: RootState) => state.resourceList.searchTerm,
    );

    const searchFilter = useSelector(
        (state: RootState) => state.resourceList.searchFilter,
    );

    const [resourcesCollapseState, setResourcesCollapseState] = useState<
        { name: string; isCollapsed: boolean }[]
    >(
        resourceLookup.map((x) => {
            return {
                name: x.name,
                isCollapsed: false,
            };
        }),
    );

    return (
        <>
            <div className="pt-2 rounded-md flex justify-end px-2">
                <button
                    type="button"
                    className="rounded-l-md bg-gray-400 px-2 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-500 border"
                    onClick={() => {
                        setResourcesCollapseState((prevState) =>
                            prevState.map((x) => {
                                return { name: x.name, isCollapsed: false };
                            }),
                        );
                    }}
                >
                    Expand All
                </button>
                <button
                    type="button"
                    className="rounded-r-md -ml-px bg-gray-400 px-2 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-500 border"
                    onClick={() => {
                        setResourcesCollapseState((prevState) =>
                            prevState.map((x) => {
                                return { name: x.name, isCollapsed: true };
                            }),
                        );
                    }}
                >
                    Collapse All
                </button>
            </div>
            {/*<ListOptions />*/}
            {resourceLookup
                .filter((x) => filter === 'all' || filter === x.provider)
                .filter((x) => {
                    const searchArgs = searchTerm
                        .toLowerCase()
                        .trim()
                        .split(' ');

                    for (let i = 0; i < searchArgs.length; i++) {
                        if (
                            !x.description.small
                                .toLowerCase()
                                .includes(searchArgs[i]) &&
                            !x.display_name
                                ?.toLowerCase()
                                .includes(searchArgs[i])
                        ) {
                            return false;
                        }
                    }

                    return true;
                })
                .filter((x) => {
                    // Allow all items if filter is not set
                    if (!searchFilter.length) return true;

                    // If filter only has one cat set, accept any resource with any subcat tags
                    if (searchFilter.length === 1) {
                        return x.tags.some((r) =>
                            categories[searchFilter[0]].includes(r),
                        );
                        // Else check tags includes subcat.
                    } else {
                        return x.tags.includes(searchFilter[1]);
                    }
                })
                .map((x) => {
                    return (
                        <ResourceElement
                            resource={x}
                            key={x.name}
                            isCollapsed={
                                resourcesCollapseState.find(
                                    (res) => res.name === x.name,
                                )?.isCollapsed || false
                            }
                            setIsCollapsed={(isCollapsed: boolean) => {
                                setResourcesCollapseState((prevState) => {
                                    return [
                                        ...prevState.filter(
                                            (prev) => prev.name !== x.name,
                                        ),
                                        {
                                            name: x.name,
                                            isCollapsed,
                                        },
                                    ];
                                });
                            }}
                        />
                    );
                })}
        </>
    );
};

export default ResourceList;
