import { Handle, Position } from 'reactflow';
import React from 'react';

const ResourceNodeKeyInput = ({ pos }: { pos: number }) => {
    return (
        <div className="flex p-1 relative grid grid-cols-3">
            <Handle
                type="target"
                position={Position.Left}
                id={`${pos}-b`}
                style={{
                    background: '#555',
                    width: '15px',
                    backgroundColor: 'lightblue',
                    height: '15px',
                    borderRadius: '10px',
                    left: '-15px',
                }}
            />
            <div className="col-span-1">
                <p>Key Name:</p>
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
                id={`${pos}-b`}
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
    );
};

export default ResourceNodeKeyInput;
