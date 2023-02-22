export interface IResourceKeyState {
    id: string;
    name: string;
    // type: 'string';
    value: string;
    valid: boolean;
    // touched: boolean;
}

// The state for the data of an individual resource in redux
export interface IResourceState {
    id: string;
    type: string; // Resource type
    keys: IResourceKeyState[];
    valid: boolean;
    instance_name: string;
    instance_name_valid: boolean;
}

export interface INodeState {
    id: string;
    position: { x: number; y: number };
    data: { state: IResourceState };
}
