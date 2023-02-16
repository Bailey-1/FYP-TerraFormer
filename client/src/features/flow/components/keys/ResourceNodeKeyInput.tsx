import React from 'react';
import { IResourceKeyState } from '../../../../interfaces/IResourceState';
import { IResourceKey } from '../../../../interfaces/IResourceObject';

const ResourceNodeKeyInput = ({
    keyState,
    onChange,
    globalKey,
}: {
    keyState: IResourceKeyState;
    onChange: (name: string, value: string) => void;
    globalKey: IResourceKey;
}) => {
    return (
        <div className="flex p-1 relative grid grid-cols-3">
            {/*<Handle*/}
            {/*    type="target"*/}
            {/*    position={Position.Left}*/}
            {/*    id={keyState.id}*/}
            {/*    style={{*/}
            {/*        background: '#555',*/}
            {/*        width: '15px',*/}
            {/*        backgroundColor: 'lightblue',*/}
            {/*        height: '15px',*/}
            {/*        borderRadius: '10px',*/}
            {/*        left: '-15px',*/}
            {/*    }}*/}
            {/*/>*/}
            <div className="col-span-1 text-gray-400">
                <p>{keyState.name}:</p>
            </div>
            <div className="col-span-2">
                <input
                    type="text"
                    style={{ padding: '0px' }}
                    className="nodrag"
                    value={keyState.value}
                    onChange={(e) => onChange(keyState.name, e.target.value)}
                />
            </div>
            {/*<Handle*/}
            {/*    type="source"*/}
            {/*    position={Position.Right}*/}
            {/*    id={keyState.id}*/}
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

export default ResourceNodeKeyInput;
