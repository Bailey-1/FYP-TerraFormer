import { IResourceState } from '@bailey-1/terraformwebapp-common';

interface IConnection {
    id: string;
    source: string;
    sourceHandle: string;
    target: string;
    targetHandle: string;
    data: { value: string };
}

export default interface IResourceBody {
    resources: IResourceState[];
    edges: IConnection[];
}
