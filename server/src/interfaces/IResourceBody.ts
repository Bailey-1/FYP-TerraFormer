import { IResourceState } from '@bailey-1/terraformwebapp-common';

interface IConnection {
    id: string;
    source: string;
    sourceHandle: string;
    target: string;
    targetHandle: string;
    data: { value: string };
    type: string;
}

interface IResource {
    id: string;
    type: string;
    resourceState: IResourceState;
}

export default interface IResourceBody {
    resources: IResource[];
    edges: IConnection[];
}
