// The state for the data of an individual resource in redux
export interface IResourceState {
    id: number;
    type: string; // Resource type
    keys: { name: string; value: string }[];
}
