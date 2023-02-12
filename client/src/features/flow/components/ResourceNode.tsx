import React, { useState } from 'react';
import ResourceNodeKeyInput from './keys/ResourceNodeKeyInput';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useNodeId, useUpdateNodeInternals } from 'reactflow';

const PillButton = ({
    children,
    onClick,
}: {
    children: string;
    onClick: (val: string) => void;
}) => {
    return (
        <button
            className="text-xs bg-orange-300 rounded-full p-1 px-2 m-1 flex"
            onClick={(e) => onClick(e.currentTarget.textContent || '')}
        >
            <div>{children}</div>
            <PlusCircleIcon className="ml-1 h-4 w-4 text-gray-700" />
        </button>
    );
};

const DisclosureComponent = ({
    onClick,
}: {
    onClick: (val: string) => void;
}) => {
    return (
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-2 py-1 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>Additional Keys</span>
                            <ChevronUpIcon
                                className={`${
                                    open ? 'rotate-180 transform' : ''
                                } h-5 w-5 text-purple-500`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="p-2 text-sm text-gray-500 flex flex-wrap justify-center">
                            <PillButton onClick={onClick}>
                                Example Button
                            </PillButton>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
};

const ResourceNode = () => {
    const nodeId = useNodeId();
    const updateNodeInternals = useUpdateNodeInternals();

    const [keys, setKeys] = useState<string[]>([]);

    const onClick = (val: string) => {
        setKeys((prevState) => [...prevState, val]);

        if (nodeId) {
            updateNodeInternals(nodeId);
        }
    };

    return (
        <div className="bg-gray-300 p-2 rounded border border-black">
            <h1 className="text-xl">Resource Name</h1>
            <p>NodeID: {nodeId}</p>

            {/*<ResourceNodeKeyInput pos={1} />*/}
            {/*<ResourceNodeKeyInput pos={2} />*/}
            {/*<ResourceNodeKeySelect pos={3} />*/}
            {/*<ResourceNodeKeySelect pos={4} />*/}

            {keys.reverse().map((x, i) => {
                return <ResourceNodeKeyInput pos={i} key={i} />;
            })}

            <DisclosureComponent onClick={onClick} />
        </div>
    );
};

export default ResourceNode;
