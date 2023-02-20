import k from '../const';

const ProviderColours = {
    [k.providers.azure]: {
        background: 'bg-azure-blue',
        foreground: 'text-gray-200',
    },
    [k.providers.aws]: {
        background: 'bg-aws-yellow',
        foreground: 'text-gray-200',
    },
    [k.providers.gcp]: {
        background: 'bg-gcp-red',
        foreground: 'text-gray-200',
    },
};

export default ProviderColours;
