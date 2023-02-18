// Decide which input to use for a key
import { IResourceKeyState } from '../../../interfaces/IResourceState';
import {
    IResourceKey,
    IResourceKeyResource,
    IResourceKeySelect,
} from '../../../interfaces/IResourceObject';
import ResourceNodeKeyInput from './keys/ResourceNodeKeyInput';
import ResourceNodeKeySelect from './keys/ResourceNodeKeySelect';
import ResourceNodeKeyResource from './keys/ResourceNodeKeyResource';

const ResourceKeyDecider = ({
    keyState,
    onChange,
    globalKey,
}: {
    keyState: IResourceKeyState;
    onChange: (name: string, value: string) => void;
    globalKey:
        | IResourceKey
        | IResourceKeySelect
        | IResourceKeyResource
        | undefined;
}) => {
    if (globalKey) {
        switch (globalKey.type) {
            case 'string':
                return (
                    <ResourceNodeKeyInput
                        keyState={keyState}
                        globalKey={globalKey}
                        onChange={onChange}
                    />
                );
            case 'select':
                return (
                    <ResourceNodeKeySelect
                        keyState={keyState}
                        globalKey={globalKey}
                        onChange={onChange}
                    />
                );
            case 'resource':
                return (
                    <ResourceNodeKeyResource
                        keyState={keyState}
                        globalKey={globalKey}
                        onChange={onChange}
                    />
                );
        }
    }

    return <p>Global key is not valid</p>;
};

export default ResourceKeyDecider;
