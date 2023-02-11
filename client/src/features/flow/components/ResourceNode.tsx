import { Handle, Position } from 'reactflow';
import React from 'react';

const ResourceNode = () => {
    return (
        <div className="bg-gray-300 p-2 rounded">
            <h1 className="text-xl">Resource Name</h1>

            <div className="flex">
                <Handle
                    type="target"
                    position={Position.Left}
                    style={{ background: '#555' }}
                    id="a"
                />
                <p>Key Name:</p>
                <input type="text" style={{ width: '100px', padding: '0px' }} />
                <Handle
                    type="source"
                    position={Position.Right}
                    style={{ background: '#555' }}
                    id="b"
                />
            </div>
        </div>
    );
};

export default ResourceNode;
