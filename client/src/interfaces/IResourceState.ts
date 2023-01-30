export interface IResourceKeyState {
    name: string;
    type: 'string';
    value: string;
    valid: boolean;
    // touched: boolean;
}

export interface IResourceKeySelectState {
    name: string;
    type: 'select';
    options: string[];
    valid: boolean;
    // touched: boolean;
}

// The state for the data of an individual resource in redux
export interface IResourceState {
    id: number;
    type: string; // Resource type
    keys: (IResourceKeyState | IResourceKeySelectState)[];
    valid: boolean;
    instance_name: string;
}
