const ResourceLookup: IResourceObject[] = [
    {
        name: 'azurerm_resource_group',
        provider: 'azure',
        docs: 'https://site.com',
        validation: function () {
            return !!this.docs;
        },
        keys: [
            {
                name: 'keyname',
                type: 'string',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('a');
                },
            },
            {
                name: 'keyname2',
                type: 'string',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
            },
        ],
    },
    {
        name: 'azurerm_container_registry',
        provider: 'azure',
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
            },
            {
                name: 'keyname2',
                type: 'string',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
            },
        ],
    },
    {
        name: 'aws_test1',
        provider: 'aws',
        docs: 'todo add docs',
        validation: () => true,
        keys: [],
    },
    {
        name: 'aws_test2',
        provider: 'aws',
        docs: 'todo add docs',
        validation: () => true,
        keys: [],
    },
];

export default ResourceLookup;
