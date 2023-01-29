export interface IResourceKeyState {
    name: string;
    value: string;
    valid: boolean;
    // touched: boolean;
}

// The state for the data of an individual resource in redux
export interface IResourceState {
    id: number;
    type: string; // Resource type
    keys: IResourceKeyState[];
    valid: boolean;
}
