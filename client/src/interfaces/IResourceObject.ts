export interface IResourceKey {
    name: string;
    type: string;
    value: string;
    validation: (value: string) => boolean;
    validation_message: string;
}

// The unique resource object
export interface IResourceObject {
    name: string;
    display_name: string | null;
    provider: string;
    docs: string;
    validation: () => boolean;
    keys: IResourceKey[];
}
