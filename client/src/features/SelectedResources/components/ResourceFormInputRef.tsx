import {
    IResourceKeyState,
    IResourceState,
} from '../../../interfaces/IResourceState';
import { useDispatch } from 'react-redux';
import { IResourceKeyResource } from '../../../interfaces/IResourceObject';
import { updateResourceKey } from '../../ResourceSlice';
import { useState } from 'react';

const OptionComponent = ({
    id,
    instance_name,
}: {
    id: number;
    instance_name: string;
}) => {
    return (
        <option key={id} value={id}>
            {instance_name}
        </option>
    );
};

const ResourceFormInputRef = ({
    keyState,
    globalKey,
    resourceState,
    options,
}: {
    keyState: IResourceKeyState;
    resourceState: IResourceState;
    globalKey: IResourceKeyResource;
    options: IResourceState[];
}) => {
    const dispatch = useDispatch();

    const [selectValue, setSelectValue] = useState('');
    // const ref = useRef<HTMLSelectElement>(null);

    // useEffect(() => {
    //     console.log(ref.current?.value);
    // }, [ref.current?.value]);

    // const ref = useCallback(node => {
    //     if (node !== null) {
    //         setHeight(node.getBoundingClientRect().height);
    //     }
    // }, []);

    const updateKey = (name: string, value: string) => {
        dispatch(
            updateResourceKey({
                id: resourceState.id,
                key: name,
                value,
                valid: !!globalKey.validation
                    ? globalKey.validation(value)
                    : true,
            }),
        );
    };

    return (
        <select
            value={keyState.value}
            onChange={(e) => {
                updateKey(keyState.name, e.target.value);
            }}
            className="test"
            // ref={ref}
        >
            {options.map((x) => (
                <OptionComponent
                    key={x.id}
                    id={x.id}
                    instance_name={x.instance_name}
                />
            ))}
        </select>
    );
};

export default ResourceFormInputRef;
