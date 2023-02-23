import { ISubResourceObject } from '../interfaces/ISubResourceObject';
import k from '../const';

export const TagSubResource: ISubResourceObject = {
    name: 'tags',
    display_name: 'Tags',
    provider: k.providers.azure,
    keys: [
        {
            name: 'name',
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
