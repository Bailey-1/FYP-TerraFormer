import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Tab, Transition } from '@headlessui/react';

const menu = [
    {
        title: 'Getting Started',
    },
    {
        title: 'Using Terraform',
    },
    {
        title: 'Using TerraFormer',
    },
    {
        title: 'Creating Your First Config',
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const HelpModal = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 500);
    }, []);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full justify-center text-center items-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-5xl p-4">
                                <Dialog.Title className="text-4xl ml-4 p-2 text-terraform-purple-500">
                                    Getting Started
                                </Dialog.Title>
                                <div className="grid grid-cols-5 rounded p-2 border-t-2">
                                    <Tab.Group vertical>
                                        <div className="col-span-1 flex flex-col p-2">
                                            {menu.map((item) => (
                                                <Tab
                                                    key={item.title}
                                                    className={({
                                                        selected,
                                                    }) => {
                                                        return classNames(
                                                            'w-full rounded p-4 text-sm text-gray-700 focus:outline-none',
                                                            selected
                                                                ? 'bg-gray-300 font-medium'
                                                                : '',
                                                        );
                                                    }}
                                                >
                                                    {item.title}
                                                </Tab>
                                            ))}
                                        </div>
                                        <div className="col-span-4 border-l-2 p-2">
                                            <Tab.Panels>
                                                <Tab.Panel>
                                                    Content 1 Content 1Content
                                                    1Content 1Content 1Content
                                                    1Content 1Content 1Content
                                                    1Content 1Content 1Content
                                                    1Content 1Content 1Content
                                                    1Content 1Content 1Content
                                                    1Content 1Content 1Content 1
                                                </Tab.Panel>
                                                <Tab.Panel>
                                                    <div className="py-2 px-4">
                                                        <h2 className="text-3xl">
                                                            Title
                                                        </h2>
                                                        <p>Some text</p>
                                                        <p>
                                                            Some text. And some
                                                            more text right here
                                                        </p>
                                                        <ul className="list-disc">
                                                            <li>Item 1</li>
                                                            <li>Item 1</li>
                                                            <li>Item 1</li>
                                                        </ul>
                                                        <h3 className="mt-2 text-xl font-medium">
                                                            Subtitle
                                                        </h3>
                                                        <p>
                                                            Subtitle paragraph
                                                        </p>
                                                    </div>
                                                </Tab.Panel>
                                                <Tab.Panel>Content 3</Tab.Panel>
                                            </Tab.Panels>
                                        </div>
                                    </Tab.Group>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default HelpModal;
