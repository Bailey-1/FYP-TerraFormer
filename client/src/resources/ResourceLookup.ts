import k from '../const';
import { IResourceObject } from '@bailey-1/terraformwebapp-common';
import { TagSubResource } from './SubResourceLookup';

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
                display_name: 'Name',
                type: 'string',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('a');
                },
                validation_message: 'Must include the letter a',
                required: true,
            },
            {
                name: 'location',
                display_name: 'Location',
                type: 'select',
                options: k.azure.regions,
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
                validation_message: 'Must include the letter b',
                required: true,
            },
        ],
        attributes: ['id', 'name', 'location'],
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
                name: 'resource_group_name',
                display_name: 'Resource Group Name',
                type: 'resource',
                resource_type: 'azurerm_resource_group',
                resource_property: 'name',
                validation: (value: string): boolean => {
                    return !!value.length;
                },
                validation_message: 'Must include the letter b',
                required: true,
            },
            {
                name: 'keyname2',
                display_name: 'Keyname2',
                type: 'string',
                value: '',
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
            {
                name: 'georeplications',
                display_name: 'Geo Replications',
                type: 'block',
                block: {
                    name: 'georeplications',
                    display_name: 'Geo Replications',
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
                            validation_message: 'Must include the letter b',
                            required: true,
                        },
                    ],
                    attributes: [],
                },
                validation: (value: string): boolean => {
                    return !!value.length;
                },
                validation_message: 'Must include the letter b',
                required: false,
            },
        ],
        attributes: [],
    },
    {
        name: 'aws_test1',
        display_name: 'AWS Test 1',
        provider: k.providers.aws,
        docs: 'todo add docs',
        validation: () => true,
        keys: [],
        attributes: [],
    },
    {
        name: 'aws_test2',
        display_name: 'AWS Test 2',
        provider: k.providers.aws,
        docs: 'todo add docs',
        validation: () => true,
        keys: [],
        attributes: [],
    },
    {
        name: 'gcp_test',
        display_name: 'GCP Test 1',
        provider: k.providers.gcp,
        docs: 'todo add docs',
        validation: () => true,
        keys: [],
        attributes: [],
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
                display_name: 'Name',
                type: 'string',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('a');
                },
                validation_message: 'Must include the letter a',
                required: true,
            },
            {
                name: 'resource_group_name',
                display_name: 'Resource Group',
                type: 'resource',
                resource_type: 'azurerm_resource_group',
                resource_property: 'name',
                validation: (value: string): boolean => {
                    return !!value.length;
                },
                validation_message: 'Must include the letter b',
                required: true,
            },
            {
                name: 'os_type',
                display_name: 'OS Type',
                type: 'select',
                options: ['Windows', 'Linux', 'LinuxContainer'],
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
                validation_message: 'Must include the letter b',
                required: true,
            },
            {
                name: 'sku_name',
                display_name: 'SKU Name',
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
                required: true,
            },
        ],
        attributes: [],
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
                display_name: 'Name',
                type: 'string',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('a');
                },
                validation_message: 'Must include the letter a',
                required: true,
            },
            {
                name: 'service_plan_id',
                display_name: 'Service Plan',
                type: 'resource',
                resource_type: 'azurerm_service_plan',
                resource_property: 'id',
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
                validation_message: 'Must include the letter b',
                required: true,
            },
        ],
        attributes: [],
    },
];

export default ResourceLookup;
