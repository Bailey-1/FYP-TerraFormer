import PillButton from '../../../components/controls/PillBtn';
import React, { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';

const SearchBar = () => {
    const [selectedCat, setSelectedCat] = useState<string[]>([]);

    const categories: { [x: string]: string[] } = {
        Compute: ['Virtual Machines', 'App Service'],
        Databases: ['SQL', 'NoSQL', 'MSSQL', 'PostgreSQL'],
        Storage: ['Account', 'Blob', 'File'],
        Management: ['Resources', 'Vault'],
        Containers: ['Kubernetes', 'Instance', 'Registry'],
    };

    return (
        <div className="bg-gray-700 p-4">
            <div className="flex rounded-md shadow-sm pb-4">
                <div className="relative flex flex-grow items-stretch">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        className="w-full rounded-md py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 text-base"
                        placeholder="Search"
                    />
                </div>
                {/*<button className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm text-gray-300 bg-blue-700 hover:bg-blue-800">*/}
                {/*    <MagnifyingGlassIcon className="-ml-0.5 h-5 w-5 text-gray-400" />*/}
                {/*    Search*/}
                {/*</button>*/}
            </div>
            {/*Primary categories*/}
            {!selectedCat.length && (
                <div className="px-2 flex flex-wrap">
                    {Object.keys(categories).map((x) => {
                        return (
                            <PillButton
                                onClick={() => setSelectedCat([x])}
                                className="px-2 bg-blue-300 hover:bg-blue-400"
                                key={x}
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
                                    className="px-2 bg-red-300 hover:bg-red-400"
                                    key={cat}
                                >
                                    <p className="text-sm">{cat}</p>
                                    <XMarkIcon className="h-5 w-5" />
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
                                            className="px-2 border bg-yellow-500 text-gray-800 hover:bg-yellow-600"
                                            key={sub}
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
