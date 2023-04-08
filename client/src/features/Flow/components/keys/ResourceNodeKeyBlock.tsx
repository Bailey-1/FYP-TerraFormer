import {
    IResourceKeyBlock,
    IResourceKeyBlockState,
} from '@bailey-1/terraformwebapp-common';
import { Connection, Handle, Position, useNodeId } from 'reactflow';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { removeNodeKey } from '../../../FlowSlice';
import PillButton from '../../../../components/controls/PillBtn';

const ResourceNodeKeyBlock = ({
    keyState,
    globalKey,
    onChange,
}: {
    keyState: IResourceKeyBlockState;
    globalKey: IResourceKeyBlock;
    onChange(name: string, value: string[]): void;
}) => {
    const nodeId = useNodeId();

    const additionalDetails = useSelector(
        (state: RootState) => state.settings.additionalDetails,
    );

    const dispatch = useDispatch();

    // Find any edges which link to this input
    const edgeData = useSelector((state: RootState) =>
        state.flow.edges.filter(
            (x) =>
                x.target === nodeId &&
                x.targetHandle === `key-block-${globalKey.name}-${keyState.id}`,
        ),
    );

    const connectedBlockIds = edgeData.map((x) => x.source);

    if (!nodeId) {
        return <p>Error: NodeID does not exist</p>;
    }

    const removeKey = () => {
        dispatch(
            removeNodeKey({
                nodeId: nodeId,
                keyId: keyState.id,
            }),
        );
    };

    return (
        <div>
            <div className="relative flex justify-between">
                <h2>{globalKey.display_name}</h2>
                <Handle
                    type="target"
                    position={Position.Left}
                    // id={keyState.id}
                    id={`key-block-${globalKey.name}-${keyState.id}`}
                    className="bg-blue-300"
                    style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '10px',
                        left: '-15px',
                    }}
                    data-cy={`target-handle-${globalKey.name}`}
                    isValidConnection={(connection: Connection) => {
                        console.log(JSON.stringify(connection));
                        return (
                            connection.targetHandle?.includes(
                                `key-${connection.sourceHandle}`,
                            ) || false
                        );
                    }}
                />
                <p className="pl-2">{!!edgeData.length ? '✅' : '❌'}</p>
                <PillButton className="" onClick={() => removeKey()}>
                    Remove
                </PillButton>
            </div>
            {additionalDetails && (
                <div className="grid grid-cols-3 bg-gray-700 rounded p-2">
                    <div>
                        <h3>Debug</h3>
                    </div>
                    <div className="col-span-2">
                        <p>
                            <b>KeyID:</b> {keyState.id}
                        </p>
                        <p>
                            <b>Connected:</b>
                            {JSON.stringify(connectedBlockIds)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResourceNodeKeyBlock;
