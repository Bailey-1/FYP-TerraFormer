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

const ResourceNodeKeySelect = ({ pos }: { pos: number }) => {
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
                <select style={{ padding: '0px' }} className="nodrag w-full">
                    <option value="option-1">Option 1</option>
                    <option value="option-2">Option 2</option>
                    <option value="option-3">Option 3</option>
                </select>
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

const ResourceNode = () => {
    return (
        <div className="bg-gray-300 p-2 rounded">
            <h1 className="text-xl">Resource Name</h1>

            <ResourceNodeKeyInput pos={1} />
            <ResourceNodeKeyInput pos={2} />
            <ResourceNodeKeySelect pos={3} />
            <ResourceNodeKeySelect pos={4} />
        </div>
    );
};

export default ResourceNode;
