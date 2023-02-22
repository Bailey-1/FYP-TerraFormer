import {
    IResourceKey,
    IResourceKeyResource,
    IResourceKeySelect,
} from './IResourceObject';

export interface ISubResourceObject {
    name: string;
    display_name: string | null;
    provider: string;
    validation?: () => boolean;
    keys: (IResourceKey | IResourceKeySelect | IResourceKeyResource)[];
    attributes: string[];
}
