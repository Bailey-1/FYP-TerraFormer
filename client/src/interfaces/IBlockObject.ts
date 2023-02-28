import { IResourceKeys } from './IResourceObject';

export interface IBlockObject {
    name: string;
    display_name: string;
    provider: string;
    validation?: () => boolean;
    keys: IResourceKeys[];
    attributes: string[];
}
