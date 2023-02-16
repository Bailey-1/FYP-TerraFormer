import React from 'react';
import { IResourceKeyState } from '../../../../interfaces/IResourceState';
import { IResourceKeySelect } from '../../../../interfaces/IResourceObject';

const ResourceNodeKeySelect = ({
    keyState,
    globalKey,
    onChange,
}: {
    keyState: IResourceKeyState;
    globalKey: IResourceKeySelect;
    onChange(name: string, value: string): void;
}) => {
    return (
        <div className="flex p-1 relative grid grid-cols-3">
            {/*<Handle*/}
            {/*    type="target"*/}
            {/*    position={Position.Left}*/}
            {/*    id={`${keyState.id}-b`}*/}
            {/*    style={{*/}
            {/*        background: '#555',*/}
            {/*        width: '15px',*/}
            {/*        backgroundColor: 'lightblue',*/}
            {/*        height: '15px',*/}
            {/*        borderRadius: '10px',*/}
            {/*        left: '-15px',*/}
            {/*    }}*/}
            {/*/>*/}
            <div className="col-span-1 text-gray-300">
                <p>Key Name:</p>
            </div>
            <div className="col-span-2">
                <select style={{ padding: '0px' }} className="nodrag w-full">
                    {globalKey.options.sort().map((x) => (
                        <option key={x} value={x}>
                            {x}
                        </option>
                    ))}
                </select>
            </div>

            {/*<Handle*/}
            {/*    type="source"*/}
            {/*    position={Position.Right}*/}
            {/*    id={`${keyState.id}-b`}*/}
            {/*    style={{*/}
            {/*        background: '#555',*/}
            {/*        width: '15px',*/}
            {/*        backgroundColor: 'pink',*/}
            {/*        height: '15px',*/}
            {/*        borderRadius: '10px',*/}
            {/*        right: '-15px',*/}
            {/*    }}*/}
            {/*/>*/}
        </div>
    );
};

export default ResourceNodeKeySelect;
