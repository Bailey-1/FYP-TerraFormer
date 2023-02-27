import { IBlockObject } from '../interfaces/IBlockObject';
import k from '../const';

export const TagSubResource: IBlockObject = {
    name: 'tags',
    display_name: 'Tags',
    provider: k.providers.azure,
    keys: [
        {
            name: 'name',
            display_name: 'Name',
            type: 'string',
            value: '',
            validation: (value: string): boolean => {
                return value.includes('b');
            },
            validation_message: '',
            required: true,
        },
        {
            name: 'value',
            display_name: 'Value',
            type: 'string',
            value: '',
            validation: (value: string): boolean => {
                return value.includes('b');
            },
            validation_message: '',
            required: true,
        },
    ],
    attributes: [],
};
