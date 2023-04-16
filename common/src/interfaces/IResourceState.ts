export type IResourceKeyStateTypes =
    | IResourceKeyState
    | IResourceKeyResourceState
    | IResourceKeyBlockState;

export interface IResourceKeyState {
    id: string;
    name: string;
    type: 'string';
    value: string;
    valid: boolean;
    // touched: boolean;
}

// State for keys referencing another resource
export interface IResourceKeyResourceState {
    id: string;
    name: string; // For the key name e.g. resource_group_name
    type: 'resource';
    value: string;
    valid: boolean;
}

// Key state for a block key type
export interface IResourceKeyBlockState {
    id: string;
    name: string; // For the key name e.g. resource_group_name
    type: 'block';
    valid: boolean;
    value: string[];
}

// The state for the data of an individual resource in redux
export interface IResourceState {
    id: string;
    type: string; // Resource type
    keys: IResourceKeyStateTypes[];
    valid: boolean;
    instance_name: string;
    instance_name_valid: boolean;
}

export interface INodeState {
    id: string;
    position: { x: number; y: number };
    data: { state: IResourceState };
}
