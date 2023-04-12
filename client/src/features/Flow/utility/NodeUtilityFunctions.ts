import { addNewNodeKey, onNodesChange, updateNodeKey } from '../../FlowSlice';
import { IResourceKeys } from '@bailey-1/terraformwebapp-common';
import { Dispatch } from '@reduxjs/toolkit';

export const removeNode = (dispatch: Dispatch, nodeId: string) => {
    dispatch(
        onNodesChange([
            {
                id: nodeId,
                type: 'remove',
            },
        ]),
    );
};

export const updateKey = (
    dispatch: Dispatch,
    nodeId: string,
    name: string,
    value: string | string[],
    type?: string,
) => {
    dispatch(
        updateNodeKey({
            nodeId: nodeId,
            key: name,
            value,
            type,
        }),
    );
};

export const addExtraKey = (
    dispatch: Dispatch,
    nodeId: string,
    obj: IResourceKeys,
) => {
    dispatch(
        addNewNodeKey({
            nodeId: nodeId,
            keyName: obj.name,
            keyType: obj.type,
        }),
    );
};
