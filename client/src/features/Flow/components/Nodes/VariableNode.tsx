import React from 'react';
import { Handle, Position } from 'reactflow';

const VariableNode = () => {
    return (
        <div className="bg-gray-300 p-2 rounded border border-black">
            <h1 className="text-xl">Data Node</h1>

            <div className="flex p-1 relative grid grid-cols-3">
                <div className="col-span-1">
                    <p>Value:</p>
                </div>
                <div className="col-span-2">
                    <input
                        type="text"
                        style={{ padding: '0px' }}
                        className="nodrag"
                    />
                </div>
                <Handle
                    type="source"
                    position={Position.Right}
                    id={`a-b`}
                    style={{
                        background: '#555',
                        width: '15px',
                        backgroundColor: 'pink',
                        height: '15px',
                        borderRadius: '10px',
                        right: '-15px',
                    }}
                />
            </div>
        </div>
    );
};

export default VariableNode;
