import { useState } from 'react';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const FileTabs = () => {
    const [state, setState] = useState([
        { name: 'main.tf', href: '#', current: true },
        { name: 'variables.tf', href: '#', current: false },
        { name: 'outputs.tf', href: '#', current: false },
    ]);

    return (
        <nav className="flex shadow mt-4 pt-2 pb-1">
            {state.map((tab, tabIdx) => (
                <button
                    key={tab.name}
                    className={classNames(
                        tab.current
                            ? 'text-gray-300 bg-gray-800 border-terraform-purple'
                            : 'text-gray-500 hover:text-gray-200 bg-gray-800 border-transparent',
                        tabIdx === 0 ? 'rounded-tl-lg' : '', // First
                        tabIdx === state.length - 1 ? 'rounded-tr-lg' : '', // Last
                        'relative overflow-hidden py-2 px-6 text-center border-b-4 grow',
                    )}
                    onClick={() => {
                        setState(
                            state.map((x, index) => {
                                return { ...x, current: tabIdx === index };
                            }),
                        );
                    }}
                >
                    <span className="text-lg">{tab.name}</span>
                </button>
            ))}
        </nav>
    );
};

export default FileTabs;
