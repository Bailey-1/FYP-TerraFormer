import React from 'react';
import ResourceNodeKeyInput from './keys/ResourceNodeKeyInput';
import ResourceNodeKeySelect from './keys/ResourceNodeKeySelect';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const PillButton = ({ children }: { children: string }) => {
    return (
        <button className="text-xs bg-orange-300 rounded-full p-1 px-2 m-1 flex">
            <div>{children}</div>
            <PlusCircleIcon className="ml-1 h-4 w-4 text-gray-700" />
        </button>
    );
};

const DisclosureComponent = () => {
    return (
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>What is your refund policy?</span>
                            <ChevronUpIcon
                                className={`${
                                    open ? 'rotate-180 transform' : ''
                                } h-5 w-5 text-purple-500`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 flex flex-wrap justify-center">
                            <PillButton>Example Button</PillButton>
                            <PillButton>Button</PillButton>
                            <PillButton>Button 2</PillButton>
                            <PillButton>Another Button</PillButton>
                            <PillButton>Button 3</PillButton>
                            <PillButton>Another Button</PillButton>
                            <PillButton>Btn 3</PillButton>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
};

const ResourceNode = () => {
    return (
        <div className="bg-gray-300 p-2 rounded">
            <h1 className="text-xl">Resource Name</h1>

            <ResourceNodeKeyInput pos={1} />
            <ResourceNodeKeyInput pos={2} />
            <ResourceNodeKeySelect pos={3} />
            <ResourceNodeKeySelect pos={4} />
            <DisclosureComponent />
        </div>
    );
};

export default ResourceNode;
