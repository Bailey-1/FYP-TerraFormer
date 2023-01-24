// Resource test

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { updateResourceKey } from '../features/ResourceSlice';

const InputComponent = ({
    resource,
    onChange,
    value,
}: {
    resource: { name: string; value: string };
    onChange: (value: string) => void;
    value: string;
}) => {
    return (
        <div>
            <p>{resource.name}</p>
            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    );
};

// Shared lookup objects for each type of resource - includes validation requirements and info
export const resources = {
    azurerm_resource_group: {
        name: 'azurerm_resource_group',
        provider: 'azure',
        docs: 'https://site.com',
        validation: function () {
            return !!this.docs;
        },
        keys: [
            {
                name: 'keyname',
                type: 'string',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('a');
                },
            },
            {
                name: 'keyname2',
                type: 'string',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
            },
        ],
    },
    azurerm_container_registry: {
        name: 'azurerm_container_registry',
        provider: 'azure',
        docs: 'https://site.com',
        validation: function () {
            return !!this.docs;
        },
        keys: [
            {
                name: 'resource group',
                type: 'dropdown',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('a');
                },
            },
            {
                name: 'keyname2',
                type: 'string',
                value: '',
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
            },
        ],
    },
    aws_test1: {
        name: 'aws_test1',
        provider: 'aws',
        docs: 'todo add docs',
        keys: [],
    },
    aws_test2: {
        name: 'aws_test2',
        provider: 'aws',
        docs: 'todo add docs',
        keys: [],
    },
};

const TestComponent = ({
    resourceDetails,
}: {
    resourceDetails: {
        id: number;
        type: string;
        keys: { name: string; value: string }[];
    };
}) => {
    const resource = resources[resourceDetails.type as keyof typeof resources];

    const dispatch = useDispatch();

    const resourcesArray = useSelector(
        (state: RootState) => state.resources.resources,
    );

    // const [values, setValues] = useState(
    //     resource.keys.map((x) => {
    //         return {
    //             keyname: x.name,
    //             value: '',
    //             valid: false,
    //         };
    //     }),
    // );

    const updateKey = (name: string, value: string) => {
        dispatch(
            updateResourceKey({
                id: resourceDetails.id,
                key: name,
                value,
            }),
        );
    };

    return (
        <>
            <h1>{'state name: ' + resource.name}</h1>
            <p>{'state docs: ' + resource.docs}</p>
            <div>
                {resource.keys.map((x) => (
                    <InputComponent
                        resource={x}
                        value={
                            resourceDetails.keys.find((y) => y.name === x.name)
                                ?.value || ''
                        }
                        onChange={(value) => {
                            updateKey(x.name, value);
                        }}
                        key={x.name}
                    />
                ))}
            </div>
            {/*<div>{JSON.stringify(values)}</div>*/}
        </>
    );
};

export default TestComponent;
