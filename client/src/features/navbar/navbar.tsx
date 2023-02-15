import {
    CloudIcon,
    CommandLineIcon,
    FaceSmileIcon,
} from '@heroicons/react/24/outline';
import ResourceList from '../ResourceList/ResourceList';
import { useState } from 'react';
import ReactFlowComponent from '../flow/ReactFlowComponent';
import SwitchComponent from './components/SwitchComponent';

const sidebarNavigation = [
    { name: 'All', icon: CloudIcon },
    { name: 'Azure', icon: CloudIcon },
    { name: 'AWS', icon: CloudIcon },
    { name: 'GCP', icon: CloudIcon },
    {
        name: 'Debug',
        icon: CommandLineIcon,
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
    const [currentProvider, setCurrentProvider] = useState('all');

    return (
        <div className="flex h-full flex-col">
            {/* Top nav*/}
            <header className="relative flex h-16 flex-shrink-0 items-center bg-terraform-purple justify-end">
                {/* Logo area */}
                <div className="absolute inset-y-0 left-0 static flex-shrink-0">
                    <a
                        href="#"
                        className="flex h-16 w-16 items-center justify-center w-20"
                    >
                        <FaceSmileIcon className="h-8 w-auto text-white" />
                    </a>
                </div>

                <div className="p-2 m-2 flex items-center">
                    <div className="mr-2">
                        <SwitchComponent />
                    </div>
                    <button className="p-2 px-4 m-2 bg-green-800 hover:bg-green-900 rounded-lg text-gray-100">
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
                    aria-label="Sidebar"
                    className="block flex-shrink-0 overflow-y-auto bg-gray-800"
                >
                    <div className="relative flex w-20 flex-col space-y-3 p-3">
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
                </nav>

                {/* Main area */}
                <main className="border-gray-200 min-w-0 flex-1 border-t flex">
                    {/* Primary column */}
                    <section
                        aria-labelledby="primary-heading"
                        className="flex h-full min-w-0 overflow-y-auto order-last flex-1 flex-col p-2"
                    >
                        {/*<h1>Selected resource list here</h1>*/}
                        {/*<SelectedResources />*/}
                        <ReactFlowComponent />
                    </section>

                    {/* Available resources */}
                    <aside>
                        <div className="relative flex h-full w-96 flex-col overflow-y-auto border-r border-gray-200 bg-gray-100">
                            {/*<h1>Available resource list here</h1>*/}
                            <ResourceList filter={currentProvider} />
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default Navbar;
