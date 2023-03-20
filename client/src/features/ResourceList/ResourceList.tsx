import ResourceElement from './components/ResourceElement';
import resourceLookup from '../../resources/ResourceLookup';
import React, { useState } from 'react';

const ResourceList = ({ filter }: { filter: string | null }) => {
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
            {/*<SearchBar />*/}
            {resourceLookup
                .filter((x) => filter === 'all' || filter === x.provider)
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
