import k from '../const';

const ProviderColours = {
    [k.providers.azure]: {
        background: 'bg-azure-blue',
        foreground: 'text-gray-200',
    },
    [k.providers.aws]: {
        background: 'bg-aws-yellow',
        // foreground: 'text-gray-200',
        foreground: 'text-gray-800',
    },
    [k.providers.gcp]: {
        background: 'bg-gcp-red',
        // foreground: 'text-gray-200',
        foreground: 'text-gray-800',
    },
};

export default ProviderColours;
