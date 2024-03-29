import k from '../const';
import { IResourceObject } from '@bailey-1/terraformwebapp-common';
import {
    BackupBlock,
    GeoreplicationsBlock,
    TagSubResource,
} from './SubResourceLookup';

export const categories: { [x: string]: string[] } = {
    Compute: [
        k.categories.Compute.VirtualMachines,
        k.categories.Compute.AppService,
    ],
    Databases: [
        k.categories.Databases.SQL,
        k.categories.Databases.NoSQL,
        k.categories.Databases.MSSQL,
        k.categories.Databases.PostgreSQL,
    ],
    Storage: [
        k.categories.Storage.Account,
        k.categories.Storage.Blob,
        k.categories.Storage.File,
    ],
    Management: [
        k.categories.Management.Resources,
        k.categories.Management.Vault,
    ],
    Containers: [
        k.categories.Containers.Kubernetes,
        k.categories.Containers.Instance,
        k.categories.Containers.Registry,
    ],
};

const ResourceLookup: IResourceObject[] = [
    {
        name: 'azurerm_resource_group',
        display_name: 'Azure Resource Group',
        provider: k.providers.azure,
        docs: {
            terraform:
                'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group',
            provider: 'https://site.com',
        },
        description: {
            small: `A resource group is a container that holds related resources for an Azure solution. All resources must be in a resource group.`,
        },
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
                    // return value.includes('a');
                    return /^[a-zA-Z0-9.()\-_]*[^.]$/gm.test(value);
                },
                // TODO: Add custom validation message which changes based on validation issue.
                // E.g. too short, too long, cannot end with a period, cannot contain "["
                validation_message:
                    'Valid Characters: Underscores, hyphens, periods, parentheses, and letters or digits. Cannot end with a period.',
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
        tags: [k.categories.Management.Resources],
    },
    {
        name: 'azurerm_container_registry',
        display_name: 'Azure Container Registry',
        provider: k.providers.azure,
        docs: {
            terraform:
                'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/container_registry',
            provider: 'https://site.com',
        },
        description: {
            small: 'Azure Container Registry is a managed registry service based on the open-source Docker Registry 2.0. Create and maintain Azure container registries to store and manage your container images and related artifacts.',
        },
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
                    return value.length > 4;
                },
                validation_message:
                    'Name must have a minimum length of 5 characters',
                required: true,
            },
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
            {
                name: 'sku',
                display_name: 'SKU',
                type: 'select',
                options: ['Basic', 'Standard', 'Premium'],
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
                validation_message: 'Must include the letter b',
                required: true,
            },
            {
                name: 'georeplications',
                display_name: 'Georeplications',
                type: 'block',
                block: GeoreplicationsBlock,
                validation: (value: string): boolean => {
                    return !!value.length;
                },
                validation_message: 'Must include the letter b',
                required: false,
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
        tags: [k.categories.Containers.Registry],
    },
    {
        name: 'aws_test1',
        display_name: 'AWS Test 1',
        provider: k.providers.aws,
        docs: {
            terraform: '',
            provider: '',
        },
        validation: () => true,
        keys: [],
        attributes: [],
        description: {
            small: 'Small desc',
        },
        tags: [],
    },
    {
        name: 'aws_test2',
        display_name: 'AWS Test 2',
        provider: k.providers.aws,
        docs: {
            terraform: '',
            provider: '',
        },
        validation: () => true,
        keys: [],
        attributes: [],
        description: {
            small: 'Small desc',
        },
        tags: [],
    },
    {
        name: 'gcp_test',
        display_name: 'GCP Test 1',
        provider: k.providers.gcp,
        docs: {
            terraform: '',
            provider: '',
        },
        validation: () => true,
        keys: [],
        attributes: [],
        description: {
            small: 'Small desc',
        },
        tags: [],
    },
    {
        name: 'azurerm_service_plan',
        display_name: 'Azure Service Plan',
        provider: k.providers.azure,
        docs: {
            terraform:
                'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/service_plan',
            provider: 'https://site.com',
        },
        description: {
            small: 'small desc',
        },
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
        attributes: ['id'],
        tags: [k.categories.Compute.AppService],
    },
    {
        name: 'azurerm_linux_web_app',
        display_name: 'Azure Linux Web App',
        provider: k.providers.azure,
        docs: {
            terraform: 'https://site.com',
            provider: 'https://site.com',
        },
        description: {
            small: 'small desc',
        },
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
            {
                name: 'backup',
                display_name: 'Backup',
                type: 'block',
                block: BackupBlock,
                validation: (value: string): boolean => {
                    return !!value.length;
                },
                validation_message: 'Must include the letter b',
                required: false,
            },
        ],
        attributes: [],
        tags: [k.categories.Compute.AppService],
    },
    {
        name: 'azurerm_mssql_server',
        display_name: 'Azure MS SQL Server',
        provider: k.providers.azure,
        docs: {
            terraform:
                'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/mssql_database',
            provider: 'https://site.com',
        },
        description: {
            small: 'Modernize your existing SQL Server applications at scale with an intelligent fully managed instance as a service, with almost 100% feature parity with the SQL Server database engine. Best for most migrations to the cloud.',
        },
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
            {
                name: 'version',
                display_name: 'Version',
                type: 'select',
                options: ['12.0'],
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
                validation_message: 'Must include the letter b',
                required: true,
            },
            {
                name: 'administrator_login',
                display_name: 'Admin Username',
                type: 'string',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('a');
                },
                validation_message: 'Must include the letter a',
                required: true,
            },
            {
                name: 'administrator_login_password',
                display_name: 'Admin Password',
                type: 'string',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('a');
                },
                validation_message: 'Must include the letter a',
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
        attributes: ['id', 'name', 'location'],
        tags: [k.categories.Databases.MSSQL],
    },
    {
        name: 'azurerm_mssql_database',
        display_name: 'Azure MS SQL Database',
        provider: k.providers.azure,
        docs: {
            terraform:
                'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/mssql_database',
            provider: 'https://site.com',
        },
        description: {
            small: 'Modernize your existing SQL Server applications at scale with an intelligent fully managed instance as a service, with almost 100% feature parity with the SQL Server database engine. Best for most migrations to the cloud.',
        },
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
                name: 'server_id',
                display_name: 'MS Server ID',
                type: 'resource',
                resource_type: 'azurerm_mssql_server',
                resource_property: 'id',
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
                validation_message: 'Must include the letter b',
                required: true,
            },
            {
                name: 'license_type',
                display_name: 'License Type',
                type: 'select',
                options: ['LicenseIncluded', 'BasePrice'],
                validation: (value: string): boolean => {
                    return value.includes('a');
                },
                validation_message: 'Must include the letter a',
                required: false,
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
        attributes: ['id', 'name', 'location'],
        tags: [k.categories.Databases.MSSQL],
    },
];

export default ResourceLookup;
