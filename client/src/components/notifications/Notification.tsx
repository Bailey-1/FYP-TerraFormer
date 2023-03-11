import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import {
    ExclamationCircleIcon,
    XCircleIcon,
    XMarkIcon,
} from '@heroicons/react/20/solid';

const Notification = ({ type }: { type: 'success' | 'error' | 'warning' }) => {
    const [show, setShow] = useState(true);

    // TODO Remove this test to check I can add auto remove delay.
    useEffect(() => {
        const time = Math.floor(Math.random() * 10000);

        setTimeout(() => {
            setShow(false);
        }, time);
    }, []);

    let divClassname = '';
    let headerClassname = '';

    switch (type) {
        case 'error':
            divClassname = 'bg-red-100 border-red-800';
            headerClassname = 'text-red-800';
            break;

        case 'success':
            divClassname = 'bg-green-100 border-green-800';
            headerClassname = 'text-green-800';
            break;

        case 'warning':
            divClassname = 'bg-yellow-100 border-yellow-800';
            headerClassname = 'text-yellow-800';
            break;
    }
    return (
        <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-0 opacity-0 translate-x-2"
            enterTo="translate-y-0 opacity-100 translate-x-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="translate-y-0 opacity-0 translate-x-5"
        >
            <div
                className={
                    'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg border ' +
                    divClassname
                }
            >
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            {type === 'success' && (
                                <CheckCircleIcon className="h-6 w-6 text-green-400" />
                            )}
                            {type === 'error' && (
                                <XCircleIcon className="h-6 w-6 text-red-400" />
                            )}
                            {type === 'warning' && (
                                <ExclamationCircleIcon className="h-6 w-6 text-yellow-400" />
                            )}
                        </div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p
                                className={
                                    'text-base font-medium ' + headerClassname
                                }
                            >
                                Successfully saved!
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                Anyone with a link can now view this file.
                            </p>
                        </div>
                        <div className="ml-4 flex flex-shrink-0">
                            <button
                                type="button"
                                className={
                                    'inline-flex rounded-md hover:bg-gray-400  ' +
                                    headerClassname
                                }
                                onClick={() => {
                                    setShow(false);
                                }}
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default Notification;
