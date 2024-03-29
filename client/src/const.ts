export type providers = 'azure' | 'aws' | 'gcp';
export type nodeTypes = 'resourceNode' | 'dataNode' | 'subResourceNode';

const k = {
    providers: {
        azure: 'azure' as providers,
        aws: 'aws' as providers,
        gcp: 'gcp' as providers,
    },
    azure: {
        regions: [
            'East US',
            'East US 2',
            'Central US',
            'North Central US',
            'South Central US',
            'West Central US',
            'West US',
            'West US 2',
            'West US 3',
            'Canada East',
            'Canada Central',
            'Brazil South',
            'North Europe',
            'West Europe',
            'France Central',
            'France South',
            'UK West',
            'UK South',
            'Germany Central',
            'Germany Northeast',
            'Germany North',
            'Germany West Central',
            'Switzerland North',
            'Switzerland West',
            'Norway East',
            'Norway West',
            'Southeast Asia',
            'East Asia',
            'Australia East',
            'Australia Southeast',
            'Australia Central',
            'Australia Central 2',
            'China East',
            'China North',
            'China East 2',
            'China North 2',
            'Central India',
            'West India',
            'South India',
            'Japan East',
            'Japan West',
            'Korea Central',
            'Korea South',
            'South Africa West',
            'South Africa North',
            'UAE Central',
            'UAE North',
            'US Gov Virginia',
            'US Gov Iowa',
            'US Gov Arizona',
            'US Gov Texas',
            'US DoD East',
            'US DoD Central',
            'US Sec East',
            'US Sec West',
        ],
    },
    serverHost: 'https://terradesigner.azurewebsites.net',
    categories: {
        Compute: {
            VirtualMachines: 'Virtual Machines',
            AppService: 'App Service',
        },
        Databases: {
            SQL: 'SQL',
            NoSQL: 'NoSQL',
            MSSQL: 'MSSQL',
            PostgreSQL: 'PostgreSQL',
        },
        Storage: {
            Account: 'Account',
            Blob: 'Blob',
            File: 'File',
        },
        Management: {
            Resources: 'Resources',
            Vault: 'Vault',
        },
        Containers: {
            Kubernetes: 'Kubernetes',
            Instance: 'Instance',
            Registry: 'Registry',
        },
    },
};

if (window.location.hostname.includes('localhost')) {
    k.serverHost = 'http://localhost:8080';
}

export default k;
