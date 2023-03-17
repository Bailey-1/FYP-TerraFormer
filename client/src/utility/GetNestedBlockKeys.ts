import {
    IResourceKeyBlock,
    IResourceKeys,
} from '@bailey-1/terraformwebapp-common';

const getNestedBlockKeys = (initKeys: IResourceKeys[]) => {
    const allBlockKeys: IResourceKeyBlock[] = [];

    const getBlockKeys = (keys: IResourceKeys[]) => {
        const blockKeys = keys.filter(
            (x) => x.type === 'block',
        ) as IResourceKeyBlock[];

        blockKeys.forEach((z) => {
            if (!allBlockKeys.find((x) => x.name === z.name)) {
                allBlockKeys.push(z);
            }
        });

        blockKeys.forEach((x) => getBlockKeys(x.block.keys));
    };

    getBlockKeys(initKeys);
    return allBlockKeys;
};

export default getNestedBlockKeys;
