import { IResourceKeyResourceState, IResourceKeyState } from './IResourceState';

export interface ISubResourceState {
    id: string;
    type: string;
    parent_type: string;
    keys: (IResourceKeyState | IResourceKeyResourceState)[];
    valid: boolean;
    instance_name: string;
    instance_name_valid: boolean;
}
