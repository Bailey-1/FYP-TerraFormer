import { IBlockObject } from '@bailey-1/terraformwebapp-common';
import k from '../const';

export const TagSubResource: IBlockObject = {
    name: 'tags',
    display_name: 'Tags',
    provider: k.providers.azure,
    keys: [
        {
            name: 'name',
            display_name: 'Name',
            type: 'string',
            value: '',
            validation: (value: string): boolean => {
                return value.includes('b');
            },
            validation_message: '',
            required: true,
        },
        {
            name: 'value',
            display_name: 'Value',
            type: 'string',
            value: '',
            validation: (value: string): boolean => {
                return value.includes('b');
            },
            validation_message: '',
            required: true,
        },
    ],
    attributes: [],
};

export const GeoreplicationsBlock: IBlockObject = {
    name: 'georeplications',
    display_name: 'Georeplications',
    provider: k.providers.azure,
    keys: [
        {
            name: 'location',
            display_name: 'Location',
            type: 'select',
            options: k.azure.regions,
            validation: (value: string): boolean => {
                return value.includes('b');
            },
            validation_message: '',
            required: true,
        },
        {
            name: 'tags',
            display_name: 'Tags',
            type: 'block',
            block: TagSubResource,
            validation: (value: string): boolean => {
                return !!value.length;
            },
            validation_message: 'Must include the letter b',
            required: false,
        },
    ],
    attributes: [],
};

export const BackupBlock: IBlockObject = {
    name: 'backup',
    display_name: 'Backup',
    provider: k.providers.azure,
    keys: [
        {
            name: 'name',
            display_name: 'Name',
            type: 'string',
            value: '',
            validation: (value: string): boolean => {
                return value.includes('a');
            },
            validation_message: 'Must include the letter a',
            required: true,
        },
        {
            name: 'schedule',
            display_name: 'Schedule',
            type: 'block',
            block: {
                name: 'schedule',
                display_name: 'Schedule',
                provider: k.providers.azure,
                keys: [
                    {
                        name: 'frequency_interval',
                        display_name: 'Frequency Interval',
                        type: 'string',
                        value: '',
                        validation: (value: string): boolean => {
                            return value.includes('a');
                        },
                        validation_message: 'Must include the letter a',
                        required: true,
                    },
                    {
                        name: 'frequency_unit',
                        display_name: 'Frequency Unit',
                        type: 'select',
                        options: ['Day', 'Hour'],
                        validation: (value: string): boolean => {
                            return value.includes('b');
                        },
                        validation_message: '',
                        required: true,
                    },
                    {
                        name: 'keep_at_least_one_backup',
                        display_name: 'Keep at Least One Backup',
                        type: 'select',
                        options: ['true', 'false'],
                        validation: (value: string): boolean => {
                            return value.includes('b');
                        },
                        validation_message: '',
                        required: false,
                    },
                    {
                        name: 'retention_period_days',
                        display_name: 'Retention Period Days',
                        type: 'string',
                        value: '',
                        validation: (value: string): boolean => {
                            return value.includes('a');
                        },
                        validation_message: 'Must include the letter a',
                        required: true,
                    },
                    {
                        name: 'start_time',
                        display_name: '[RFC-3339] Start Time',
                        type: 'string',
                        value: '',
                        validation: (value: string): boolean => {
                            return value.includes('a');
                        },
                        validation_message: 'Must include the letter a',
                        required: true,
                    },
                ],
                attributes: [],
            },
            validation: (value: string): boolean => {
                return !!value.length;
            },
            validation_message: 'Must include the letter b',
            required: true,
        },
        {
            name: 'storage_account_url',
            display_name: 'Storage Account URL',
            type: 'string',
            value: '',
            validation: (value: string): boolean => {
                return value.includes('a');
            },
            validation_message: 'Must include the letter a',
            required: true,
        },
        {
            name: 'enabled',
            display_name: 'Enabled',
            type: 'select',
            options: ['true', 'false'],
            validation: (value: string): boolean => {
                return value.includes('a');
            },
            validation_message: 'Must include the letter a',
            required: false,
        },
    ],
    attributes: [],
};
