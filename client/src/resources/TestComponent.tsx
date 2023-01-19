// Resource test

import { useState } from 'react';

const InputComponent = ({
    resource,
    onChange,
}: {
    resource: { keyname: string; value: string };
    onChange: (keyname: string, value: string) => void;
}) => {
    return (
        <div>
            <p>{resource.keyname}</p>
            <input
                value={resource.value}
                onChange={(event) =>
                    onChange(resource.keyname, event.target.value)
                }
            />
        </div>
    );
};

export const resources = {
    azurerm_resource_group: {
        name: 'azurerm_resource_group',
        docs: 'https://site.com',
        validation: function () {
            return !!this.docs;
        },
        keys: [
            {
                name: 'keyname',
                type: 'string',
                validation: (value: string): boolean => {
                    return value.includes('a');
                },
            },
            {
                name: 'keyname2',
                type: 'string',
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
            },
        ],
    },
    azurerm_container_registry: {
        name: 'azurerm_container_registry',
        docs: 'https://site.com',
        validation: function () {
            return !!this.docs;
        },
        keys: [
            {
                name: 'resource group',
                type: 'dropdown',
                validation: (value: string): boolean => {
                    return value.includes('a');
                },
            },
            {
                name: 'keyname2',
                type: 'string',
                validation: (value: string): boolean => {
                    return value.includes('b');
                },
            },
        ],
    },
};

const TestComponent = ({
    resource,
}: {
    resource: {
        name: string;
        docs: string;
        validation: (value: string) => boolean;
        keys: {
            name: string;
            type: string;
            validation: (value: string) => boolean;
        }[];
    };
}) => {
    const [values, setValues] = useState(
        resource.keys.map((x) => {
            return {
                keyname: x.name,
                value: '',
                valid: false,
            };
        }),
    );

    const updateKey = (keyname: string, newVal: string) => {
        setValues((prevState) => {
            return values.map((x) =>
                x.keyname === keyname
                    ? {
                          ...x,
                          value: newVal,
                          valid:
                              resource.keys
                                  .find((a) => a.name === keyname)
                                  ?.validation(newVal) || false,
                      }
                    : x,
            );
        });
    };

    return (
        <>
            <h1>{'state name: ' + resource.name}</h1>
            <p>{'state docs: ' + resource.docs}</p>
            <div>
                {values.map((x) => (
                    <InputComponent resource={x} onChange={updateKey} />
                ))}
            </div>
            <div>{JSON.stringify(values)}</div>
        </>
    );
};

export default TestComponent;
