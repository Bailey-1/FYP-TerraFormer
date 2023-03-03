import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import hcl from 'js-hcl-parser';
import IResourceBody from './interfaces/IResourceBody';

const app = express();

app.use(morgan('dev'));
app.set('trust proxy', true);
app.use(express.json());
app.use(cors());

app.use('/api/jsonToHcl', (req: Request, res: Response) => {
    const body = req.body as IResourceBody;

    console.log(body);

    // const input = {
    //     terraform: [
    //         {
    //             required_providers: [
    //                 {
    //                     azurerm: [
    //                         {
    //                             source: 'hashicorp/azurerm',
    //                             version: '3.45.0',
    //                         },
    //                     ],
    //                 },
    //             ],
    //         },
    //     ],
    //     resource: {
    //         azurerm_resource_group: {
    //             staging_rg: {
    //                 name: 'Classrooms-Staging',
    //                 location: 'UK South',
    //                 number: 12,
    //                 float: 1.5,
    //                 bool: true,
    //                 object: {
    //                     prop1: 1,
    //                     prop2: 1,
    //                     prop3: 1,
    //                 },
    //             },
    //         },
    //         azurerm_container_registry: {
    //             acr: {
    //                 name: 'stg-classrooms-cr',
    //                 resource_group_name:
    //                     '$azurerm_resource_group.staging_rg.name', // Have to reference other variables using this
    //                 location: '$azurerm_resource_group.staging_rg.location',
    //                 sku: 'Basic',
    //             },
    //         },
    //     },
    // };

    interface IBlock {
        [key: string]: string;
    }

    interface IInput {
        terraform: {
            required_providers: {
                azurerm: {
                    source: string;
                    version: string;
                }[];
            }[];
        }[];
        resource: {
            [key: string]: {
                [instance_name: string]: {
                    [props: string]: string | IBlock;
                };
            };
        };
    }

    const input: IInput = {
        terraform: [
            {
                required_providers: [
                    {
                        azurerm: [
                            {
                                source: 'hashicorp/azurerm',
                                version: '3.45.0',
                            },
                        ],
                    },
                ],
            },
        ],
        resource: {},
    };

    const primaryResources = body.resources.filter(
        (x) => x.type === 'resourceNode',
    );

    const blockResources = body.resources.filter((x) => x.type === 'blockNode');

    const connections = body.edges;

    primaryResources.forEach((primary) => {
        // Create resource type block
        if (!input.resource[primary.resourceState.type]) {
            input.resource[primary.resourceState.type] = {};
        }

        // Create resource instance block
        input.resource[primary.resourceState.type][primary.resourceState.id] =
            {};

        primary.resourceState.keys.forEach((key) => {
            const res =
                input.resource[primary.resourceState.type][
                    primary.resourceState.id
                ];

            switch (key.type) {
                case 'string':
                    res[key.name] = key.value;
                    break;

                case 'resource':
                    break;
            }
        });
    });

    debugger;

    let result: string = hcl.stringify(JSON.stringify(input));

    // Replace references to other variables so its valid - "$a.b.c" => a.b.c
    result = result.replace(/"\$([^"]*)"/gm, '$1');

    // Remove double quotes from key string names - "location" = "UK South" -> location = "UK South"
    result = result.replace(/"(\w+)" =/gm, '$1 =');

    // Do the same but with the word "resource" in resource blocks
    result = result.replace(/"resource"/gm, 'resource');

    // You have to define a block not assign a value -> generate doesn't do this
    result = result.replace('terraform = {', 'terraform {');
    result = result.replace('required_providers = {', 'required_providers {');

    return res.send({
        status: 'success',
        result,
    });
});

export { app };
