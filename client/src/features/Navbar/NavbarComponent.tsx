import {
    CloudIcon,
    Cog8ToothIcon,
    CommandLineIcon,
} from '@heroicons/react/24/outline';
import ResourceList from '../ResourceList/ResourceList';
import React, { useState } from 'react';
import ReactFlowComponent from '../Flow/ReactFlowComponent';
import SwitchComponent from './components/SwitchComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useCreateHclMutation } from '../../services/Api';
import { IResourceState } from '@bailey-1/terraformwebapp-common';
import GeneratedHclModal from '../GeneratedHclModal/GeneratedHclModal';
import { onCreateNotification } from '../NotificationSlice';
import IResponse from '../../interfaces/IResponse';

const sidebarNavigation = [
    { name: 'All', icon: CloudIcon },
    { name: 'Azure', icon: CloudIcon },
    { name: 'AWS', icon: CloudIcon },
    { name: 'GCP', icon: CloudIcon },
    {
        name: 'Meta',
        icon: CommandLineIcon,
    },
];

const endSidebarNavigation = [
    {
        name: 'Provider Settings',
        icon: Cog8ToothIcon,
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const NavbarComponent = () => {
    const dispatch = useDispatch();
    const [currentProvider, setCurrentProvider] = useState('all');
    const [generatedHclResponse, setGeneratedHclResponse] =
        useState<IResponse>();

    const nodes = useSelector((state: RootState) => state.flow.nodes);
    const edges = useSelector((state: RootState) => state.flow.edges);

    const [createHcl, { error }] = useCreateHclMutation();

    const exportHcl = async () => {
        const resources = nodes.map((x) => {
            return {
                id: x.id,
                type: x.type,
                resourceState: x.data.resourceState as IResourceState,
            };
        });

        console.log('Resources:');

        const connections = edges.map((x) => {
            return {
                id: x.id,
                source: x.source,
                sourceHandle: x.sourceHandle,
                target: x.target,
                targetHandle: x.targetHandle,
                data: {
                    value: x.data.value,
                },
                type: x.type,
            };
        });

        createHcl({ resources, edges: connections })
            .unwrap()
            .then((payload) => {
                console.log('fulfilled', payload);

                setGeneratedHclResponse(payload.response);

                dispatch(
                    onCreateNotification({
                        type: 'success',
                        title: 'Generated HCL',
                        message:
                            'Successfully generated HCL from the resource nodes.',
                    }),
                );
            })
            .catch((error) => {
                console.error('rejected', error);
                dispatch(
                    onCreateNotification({
                        type: 'error',
                        title: 'Failed to Generate HCL',
                        message: error.data.error,
                    }),
                );
            });
    };

    return (
        <div className="flex h-full flex-col">
            {/* Top nav*/}
            <header className="relative flex h-16 flex-shrink-0 items-center bg-terraform-purple justify-end">
                {/* Logo area */}
                <div className="absolute inset-y-0 left-0 static flex-shrink-0">
                    <a
                        href="#"
                        className="flex h-16 items-center justify-center pl-4 text-white text-3xl"
                    >
                        {/*<FaceSmileIcon className="h-8 w-auto text-white" />*/}
                        TerraDesigner
                    </a>
                </div>

                <div className="p-2 m-2 flex items-center">
                    <div className="mr-2">
                        <SwitchComponent />
                    </div>
                    <button
                        className="p-2 px-4 m-2 bg-green-800 hover:bg-green-900 rounded-lg text-gray-100"
                        onClick={() => exportHcl()}
                    >
                        Export to HCL
                    </button>
                    <button className="bg-gray-300 hover:bg-gray-400 rounded-full p-2 px-4 m-2 font-bold border-gray-900 border">
                        ?
                    </button>
                </div>
            </header>

            {/* Bottom section */}
            <div className="flex min-h-0 flex-1 overflow-hidden">
                {/* Narrow sidebar*/}
                <nav
                    aria-label="SidebarComponent"
                    className="flex flex-col overflow-y-auto bg-gray-800 justify-between"
                >
                    <div className="flex w-20 flex-col space-y-3 p-3">
                        {sidebarNavigation.map((item) => (
                            <button
                                key={item.name}
                                // href={item.href}
                                className={classNames(
                                    currentProvider === item.name.toLowerCase()
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-400 hover:bg-gray-700',
                                    'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg',
                                )}
                                onClick={() =>
                                    setCurrentProvider(item.name.toLowerCase())
                                }
                            >
                                {/*<item.icon*/}
                                {/*    className="h-6 w-6"*/}
                                {/*    aria-hidden="true"*/}
                                {/*/>*/}
                                {item.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex w-20 flex-col space-y-3 p-3">
                        {endSidebarNavigation.map((item) => (
                            <button
                                key={item.name}
                                // href={item.href}
                                className={classNames(
                                    currentProvider === item.name.toLowerCase()
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-400 hover:bg-gray-700',
                                    'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg',
                                )}
                                onClick={() =>
                                    setCurrentProvider(item.name.toLowerCase())
                                }
                            >
                                <item.icon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                                {/*{item.name}*/}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Main area */}
                <main className="min-w-0 flex-1 flex">
                    {/* Primary column */}
                    <section className="flex h-full min-w-0 order-last flex-1 flex-col">
                        <ReactFlowComponent />
                    </section>

                    {/* Available resources */}
                    <aside>
                        <div className="relative flex h-full w-96 flex-col overflow-y-auto border-r border-gray-200 bg-gray-700 px-2">
                            {/*<h1>Available resource list here</h1>*/}
                            <ResourceList filter={currentProvider} />
                        </div>
                    </aside>
                </main>

                {/*<NotificationArea />*/}
                {generatedHclResponse && (
                    <GeneratedHclModal response={generatedHclResponse} />
                )}
            </div>
        </div>
    );
};

export default NavbarComponent;
