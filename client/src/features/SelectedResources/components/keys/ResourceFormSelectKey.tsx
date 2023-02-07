import { IResourceKeySelect } from '../../../../interfaces/IResourceObject';
import { IResourceKeyState } from '../../../../interfaces/IResourceState';

const ResourceFormSelectKey = ({
    keyState,
    globalKey,
    updateKey,
}: {
    keyState: IResourceKeyState;
    globalKey: IResourceKeySelect;
    updateKey(name: string, value: string): void;
}) => {
    return (
        <select
            value={keyState.value}
            onChange={(e) => {
                updateKey(keyState.name, e.target.value);
            }}
        >
            {globalKey.options.sort().map((x) => (
                <option key={x} value={x}>
                    {x}
                </option>
            ))}
        </select>
    );
};

export default ResourceFormSelectKey;
