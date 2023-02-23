// Type for text data

export interface IResourceKey {
    name: string;
    display_name: string;
    type: 'string';
    value: string;
    validation?: (value: string) => boolean;
    validation_message: string;
    required: boolean;
}

// Type for select data
export interface IResourceKeySelect {
    name: string;
    display_name: string;
    type: 'select';
    options: string[];
    validation?: (value: string) => boolean;
    validation_message: string;
    required: boolean;
}

// Type for resource data
export interface IResourceKeyResource {
    name: string;
    display_name: string;
    type: 'resource';
    resource_type: string;
    resource_property: string; // The Attribute of the linked resource being referenced. E.g. name for resource groups, ID for service plans
    validation?: (value: string) => boolean;
    validation_message: string;
    required: boolean;
}

// The unique resource object
export interface IResourceObject {
    name: string;
    display_name: string | null;
    provider: string;
    docs: string;
    validation?: () => boolean;
    keys: (IResourceKey | IResourceKeySelect | IResourceKeyResource)[];
    attributes: string[];
}
