import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onSearchTermUpdate } from '../../ResourceListSlice';
import { RootState } from '../../../store/store';

const SearchBar = () => {
    const dispatch = useDispatch();

    const searchTerm = useSelector(
        (state: RootState) => state.resourceList.searchTerm,
    );

    return (
        <div className="relative flex flex-grow items-stretch">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                className="w-full rounded-md py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 text-base"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                    dispatch(
                        onSearchTermUpdate({
                            searchTerm: e.target.value,
                        }),
                    );
                }}
            />
        </div>
    );
};

export default SearchBar;
