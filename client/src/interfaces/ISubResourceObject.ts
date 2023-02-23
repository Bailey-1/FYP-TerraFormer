import {
    IResourceKey,
    IResourceKeyResource,
    IResourceKeySelect,
} from './IResourceObject';

export interface ISubResourceObject {
    name: string;
    display_name: string;
    provider: string;
    validation?: () => boolean;
    keys: (IResourceKey | IResourceKeySelect | IResourceKeyResource)[];
    attributes: string[];
}
