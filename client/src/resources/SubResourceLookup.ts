import { IBlockObject } from '@bailey-1/terraformwebapp-common';
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

export const GeoreplicationsBlock: IBlockObject = {
    name: 'georeplications',
    display_name: 'Georeplications',
    provider: k.providers.azure,
    keys: [
        {
            name: 'location',
            display_name: 'Location',
            type: 'select',
            options: k.azure.regions,
            validation: (value: string): boolean => {
                return value.includes('b');
            },
            validation_message: '',
            required: true,
        },
        {
            name: 'tags',
            display_name: 'Tags',
            type: 'block',
            block: TagSubResource,
            validation: (value: string): boolean => {
                return !!value.length;
            },
            validation_message: 'Must include the letter b',
            required: false,
        },
    ],
    attributes: [],
};
