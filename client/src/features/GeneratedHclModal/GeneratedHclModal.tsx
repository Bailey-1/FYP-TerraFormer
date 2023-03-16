import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import FileTabs from './Components/FileTabs';
import IResponse from '../../interfaces/IResponse';
import { useDispatch } from 'react-redux';
import { onCreateNotification } from '../NotificationSlice';

const GeneratedHclModal = ({
    response,
    onDismiss,
}: {
    response: IResponse;
    onDismiss?: () => void;
}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 500);
    }, [response]);

    const downloadMain = new Blob([response.hcl.main], { type: 'text/plain' });

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full justify-center text-center items-center p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-700 px-6 pt-7 pb-6 text-left shadow-xl transition-all">
                                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={() => setOpen(false)}
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 mx-0">
                                        <CheckIcon className="h-8 w-8 text-green-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 w-full">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl text-gray-300"
                                        >
                                            Generated Terraform HCL
                                        </Dialog.Title>
                                        <FileTabs />
                                        <textarea
                                            rows={20}
                                            style={{ width: '40rem' }}
                                            value={response.hcl.main}
                                            readOnly
                                            className="resize-none"
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                        onClick={async () => {
                                            await navigator.clipboard
                                                .writeText(response.hcl.main)
                                                .then(
                                                    () => {
                                                        /* clipboard successfully set */
                                                        dispatch(
                                                            onCreateNotification(
                                                                {
                                                                    type: 'success',
                                                                    title: 'Successfully Copied to Clipboard',
                                                                },
                                                            ),
                                                        );
                                                    },
                                                    () => {
                                                        /* clipboard write failed */
                                                        dispatch(
                                                            onCreateNotification(
                                                                {
                                                                    type: 'error',
                                                                    title: 'Could not copy to clipboard',
                                                                },
                                                            ),
                                                        );
                                                    },
                                                );
                                        }}
                                    >
                                        Copy
                                    </button>
                                    <a
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                        href={window.URL.createObjectURL(
                                            downloadMain,
                                        )}
                                        download="main.tf"
                                    >
                                        Download File
                                    </a>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default GeneratedHclModal;
