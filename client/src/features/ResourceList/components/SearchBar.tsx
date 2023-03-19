import PillButton from '../../../components/controls/PillBtn';
import { useState } from 'react';

const SearchBar = () => {
    const [selectedCat, setSelectedCat] = useState<string[]>([]);

    const maxDepth = 2;

    const categories: { [x: string]: string[] } = {
        Compute: ['VMs', 'App Service', 'Kubernetes'],
        Databases: ['SQL', 'NoSQL', 'MSSQL', 'PostgreSQL'],
        Storage: ['Account', 'Blob', 'File'],
        Management: ['Resources', 'Vault'],
    };

    return (
        <div className="m-2">
            <div className="flex p-2">
                <input className="flex-1" />
                <button>Search</button>
            </div>
            {/*Primary categories*/}
            {!selectedCat.length && (
                <div className="px-2 flex overscroll-x-contain">
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
                        <div className="flex pb-2 overflow-x-scroll">
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
                                            <button className="px-2">X</button>
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
