import PillButton from '../../../components/controls/PillBtn';
import React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { onFilterUpdate } from '../../ResourceListSlice';
import { RootState } from '../../../store/store';
import { categories } from '../../../resources/ResourceLookup';

const ListOptions = () => {
    const dispatch = useDispatch();
    const searchFilter = useSelector(
        (state: RootState) => state.resourceList.searchFilter,
    );

    return (
        <div className="bg-gray-700 p-4">
            <div className="flex rounded-md shadow-sm pb-4">
                <SearchBar />
                {/*<button className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm text-gray-300 bg-blue-700 hover:bg-blue-800">*/}
                {/*    <MagnifyingGlassIcon className="-ml-0.5 h-5 w-5 text-gray-400" />*/}
                {/*    Search*/}
                {/*</button>*/}
            </div>
            {/*Primary categories*/}
            {!searchFilter.length && (
                <div className="px-2 flex flex-wrap">
                    {Object.keys(categories).map((x) => {
                        return (
                            <PillButton
                                onClick={() => {
                                    dispatch(
                                        onFilterUpdate({ searchFilter: [x] }),
                                    );
                                }}
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
            {!!searchFilter.length && (
                <div className="px-2 ">
                    <div className="flex">
                        {searchFilter.map((cat, i) => {
                            return (
                                <PillButton
                                    onClick={() => {
                                        if (i === 0) {
                                            dispatch(
                                                onFilterUpdate({
                                                    searchFilter: [],
                                                }),
                                            );
                                        } else {
                                            dispatch(
                                                onFilterUpdate({
                                                    searchFilter: [
                                                        searchFilter[0],
                                                    ],
                                                }),
                                            );
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
                    {searchFilter.length < 2 && (
                        <div className="flex pb-2 flex-wrap">
                            {categories[searchFilter[0]]
                                .filter((x) => !searchFilter.includes(x))
                                .map((sub) => {
                                    return (
                                        <PillButton
                                            onClick={() =>
                                                dispatch(
                                                    onFilterUpdate({
                                                        searchFilter: [
                                                            ...searchFilter,
                                                            sub,
                                                        ],
                                                    }),
                                                )
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

export default ListOptions;
