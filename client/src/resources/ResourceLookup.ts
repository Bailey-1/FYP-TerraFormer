import k from '../const';
import { IResourceObject } from '../interfaces/IResourceObject';

const ResourceLookup: IResourceObject[] = [
    {
        name: 'azurerm_resource_group',
        display_name: 'Azure Resource Group',
        provider: k.providers.azure,
        docs: 'https://site.com',
        validation: function () {
            return !!this.docs;
        },
        keys: [
            {
                name: 'name',
                type: 'string',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('a');
                },
                validation_message: 'Must include the letter a',
            },
            {
                name: 'location',
                type: 'select',
                options: k.azure.regions,
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
                validation_message: 'Must include the letter b',
            },
        ],
    },
    {
        name: 'azurerm_container_registry',
        display_name: 'Azure Container Registry',
        provider: k.providers.azure,
        docs: 'https://site.com',
        validation: function () {
            return !!this.docs;
        },
        keys: [
            {
                name: 'resource group',
                type: 'dropdown',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('a');
                },
                validation_message: '',
            },
            {
                name: 'keyname2',
                type: 'string',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
                validation_message: '',
            },
        ],
    },
    {
        name: 'aws_test1',
        display_name: 'AWS Test 1',
        provider: k.providers.aws,
        docs: 'todo add docs',
        validation: () => true,
        keys: [],
    },
    {
        name: 'aws_test2',
        display_name: 'AWS Test 2',
        provider: k.providers.aws,
        docs: 'todo add docs',
        validation: () => true,
        keys: [],
    },
];

export default ResourceLookup;
