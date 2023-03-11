import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import {
    ExclamationCircleIcon,
    InformationCircleIcon,
    XCircleIcon,
    XMarkIcon,
} from '@heroicons/react/20/solid';

const Notification = ({
    type,
    title,
    message,
    onRemove,
}: {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    onRemove?: () => void;
}) => {
    const [show, setShow] = useState(false);
    const [finishedInitialLoad, setFinishedInitialLoad] = useState(false);

    let divClassname,
        headerClassname = '';
    let delayUntilRemoved = 1000;

    switch (type) {
        case 'error':
            divClassname = 'bg-red-100 border-red-800';
            headerClassname = 'text-red-800';
            delayUntilRemoved = 7000;
            break;

        case 'success':
            divClassname = 'bg-green-100 border-green-800';
            headerClassname = 'text-green-800';
            delayUntilRemoved = 3000;
            break;

        case 'warning':
            divClassname = 'bg-yellow-100 border-yellow-800';
            headerClassname = 'text-yellow-800';
            delayUntilRemoved = 5000;
            break;
        case 'info':
        default:
            divClassname = 'bg-blue-100 border-blue-800';
            headerClassname = 'text-blue-800';
            delayUntilRemoved = 3000;
    }

    // Remove object after animation has finished
    useEffect(() => {
        if (!show && finishedInitialLoad && onRemove) {
            setTimeout(() => {
                onRemove();
            }, 1000);
        } else if (show) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, delayUntilRemoved);
        }
    }, [show]);

    // TODO Remove this test to check I can add auto remove delay.
    useEffect(() => {
        setShow(true);
        setFinishedInitialLoad(true);
    }, []);

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
                            {type === 'info' && (
                                <InformationCircleIcon className="h-6 w-6 text-blue-400" />
                            )}
                        </div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p
                                className={
                                    'text-base font-medium ' + headerClassname
                                }
                            >
                                {title}
                            </p>
                            {message && (
                                <p className="mt-1 text-sm text-gray-500">
                                    {message}
                                </p>
                            )}
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
