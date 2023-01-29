// The unique resource object
interface IResourceObject {
    name: string;
    provider: string;
    docs: string;
    validation: () => boolean;
    keys: {
        name: string;
        type: string;
        value: string;
        validation: (value: string) => boolean;
    }[];
}
