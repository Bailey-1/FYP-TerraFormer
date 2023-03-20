import PillButton from '../../../components/controls/PillBtn';
import React, { useState } from 'react';
import { BarsArrowUpIcon, UsersIcon } from '@heroicons/react/20/solid';

const SearchBar = () => {
    const [selectedCat, setSelectedCat] = useState<string[]>([]);

    const maxDepth = 2;

    const categories: { [x: string]: string[] } = {
        Compute: ['Virtual Machines', 'App Service', 'Kubernetes'],
        Databases: ['SQL', 'NoSQL', 'MSSQL', 'PostgreSQL'],
        Storage: ['Account', 'Blob', 'File'],
        Management: ['Resources', 'Vault'],
    };

    const test = {
        Compute: ['Virtual Machines', 'App Service', 'Kubernetes'],
        Databases: ['SQL', 'NoSQL', 'MSSQL', 'PostgreSQL'],
        Storage: ['Account', 'Blob', 'File'],
        Management: ['Resources', 'Vault'],
        Test: {
            Test1: ['TestA', 'TestB'],
            Test2: ['TestA', 'TestB'],
        },
    };

    return (
        <div className="m-2 bg-gray-800">
            <div className="flex p-2">
                <div className="flex rounded-md shadow-sm">
                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <UsersIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="John Smith"
                        />
                    </div>
                    <button
                        type="button"
                        className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <BarsArrowUpIcon
                            className="-ml-0.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        Sort
                    </button>
                </div>
            </div>
            {/*Primary categories*/}
            {!selectedCat.length && (
                <div className="px-2 flex flex-wrap">
                    {Object.keys(categories).map((x) => {
                        return (
                            <PillButton
                                onClick={() => setSelectedCat([x])}
                                className="px-2 bg-blue-300"
                            >
                                <p className="text-sm">{x}</p>
                            </PillButton>
                        );
                    })}
                </div>
            )}
            {/*Sub Categories*/}
            {!!selectedCat.length && (
                <div className="px-2 ">
                    <div className="flex">
                        {selectedCat.map((cat, i) => {
                            return (
                                <PillButton
                                    onClick={() => {
                                        if (i === 0) {
                                            setSelectedCat([]);
                                        } else {
                                            setSelectedCat((x) => [x[0]]);
                                        }
                                    }}
                                    className="px-2 bg-red-300"
                                >
                                    <p className="text-sm">{cat}</p>
                                    <button className="px-2">X</button>
                                </PillButton>
                            );
                        })}
                    </div>
                    {selectedCat.length < 2 && (
                        <div className="flex pb-2 flex-wrap">
                            {categories[selectedCat[0]]
                                .filter((x) => !selectedCat.includes(x))
                                .map((sub) => {
                                    return (
                                        <PillButton
                                            onClick={() =>
                                                setSelectedCat((x) => [
                                                    ...x,
                                                    sub,
                                                ])
                                            }
                                            className="px-2 border border-yellow-300 text-gray-300"
                                        >
                                            <p className="text-sm">{sub}</p>
                                        </PillButton>
                                    );
                                })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
