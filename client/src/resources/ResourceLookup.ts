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
                type: 'resource',
                resource_type: 'azurerm_resource_group',
                resource_property: 'name',
                validation: (value: string): boolean => {
                    return !!value.length;
                },
                validation_message: 'Must include the letter b',
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
    {
        name: 'azurerm_service_plan',
        display_name: 'Azure Service Plan',
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
                name: 'resource group',
                type: 'resource',
                resource_type: 'azurerm_resource_group',
                resource_property: 'name',
                validation: (value: string): boolean => {
                    return !!value.length;
                },
                validation_message: 'Must include the letter b',
            },
            {
                name: 'os_type',
                type: 'select',
                options: ['Windows', 'Linux', 'LinuxContainer'],
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
                validation_message: 'Must include the letter b',
            },
            {
                name: 'sku_name',
                type: 'select',
                options: [
                    'B1',
                    'B2',
                    'B3',
                    'D1',
                    'F1',
                    'I1',
                    'I2',
                    'I3',
                    'I1v2',
                    'I2v2',
                    'I3v2',
                    'P1v2',
                    'P2v2',
                    'P3v2',
                    'P1v3',
                    'P2v3',
                    'P3v3',
                    'S1',
                    'S2',
                    'S3',
                    'SHARED',
                    'EP1',
                    'EP2',
                    'EP3',
                    'WS1',
                    'WS2',
                    'WS3',
                    'Y1',
                ],
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
                validation_message: 'Must include the letter b',
            },
        ],
    },
    {
        name: 'azurerm_linux_web_app',
        display_name: 'Azure Linux Web App',
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
                name: 'service_plan_id',
                type: 'resource',
                resource_type: 'azurerm_service_plan',
                resource_property: 'id',
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
                validation_message: 'Must include the letter b',
            },
        ],
    },
];

export default ResourceLookup;
