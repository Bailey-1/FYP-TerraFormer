// Decide which input to use for a key
import {
    IResourceKeyResourceState,
    IResourceKeyState,
    IResourceKeyStateTypes,
} from '../../../interfaces/IResourceState';
import { IResourceKeys } from '../../../interfaces/IResourceObject';
import ResourceNodeKeyInput from './keys/ResourceNodeKeyInput';
import ResourceNodeKeySelect from './keys/ResourceNodeKeySelect';
import ResourceNodeKeyResource from './keys/ResourceNodeKeyResource';
import ResourceNodeKeyBlock from './keys/ResourceNodeKeyBlock';

const ResourceKeyDecider = ({
    keyState,
    onChange,
    globalKey,
}: {
    keyState: IResourceKeyStateTypes;
    onChange: (name: string, value: string) => void;
    globalKey: IResourceKeys | undefined;
}) => {
    if (globalKey) {
        switch (globalKey.type) {
            case 'string':
                return (
                    <ResourceNodeKeyInput
                        keyState={keyState as IResourceKeyState}
                        globalKey={globalKey}
                        onChange={onChange}
                    />
                );
            case 'select':
                return (
                    <ResourceNodeKeySelect
                        keyState={keyState as IResourceKeyState}
                        globalKey={globalKey}
                        onChange={onChange}
                    />
                );
            case 'resource':
                return (
                    <ResourceNodeKeyResource
                        keyState={keyState as IResourceKeyResourceState}
                        globalKey={globalKey}
                        onChange={onChange}
                    />
                );
            case 'block':
                return (
                    <ResourceNodeKeyBlock
                        keyState={keyState as IResourceKeyResourceState}
                        globalKey={globalKey}
                        onChange={onChange}
                    />
                );
        }
    }

    return <p>Global key is not valid {JSON.stringify(globalKey)}</p>;
};

export default ResourceKeyDecider;
