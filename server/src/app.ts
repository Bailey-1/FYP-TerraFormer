import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import hcl from 'js-hcl-parser';
import IResourceBody from './interfaces/IResourceBody';
import { IResourceKeyState } from '@bailey-1/terraformwebapp-common';

const app = express();

app.use(morgan('dev'));
app.set('trust proxy', true);
app.use(express.json());

app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

app.get('/api/status', (req: Request, res: Response) => {
    return res.status(200).send({
        status: 200,
        message: 'Server is alive.',
    });
});

app.post('/api/generateHcl', (req: Request, res: Response) => {
    const body = req.body as IResourceBody;

    if (!body.resources?.length) {
        return res.status(400).send({
            status: 400,
            error: 'No resources in request body.',
        });
    }

    interface IBlock {
        [key: string]: string | IBlock;
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
            const resource =
                input.resource[primary.resourceState.type][
                    primary.resourceState.id
                ];

            // Work out the value of the key for each type of resource

            switch (key.type) {
                // Just assign the value to the key
                case 'string':
                    resource[key.name] = key.value;
                    break;

                // case 'select':
                //     resource[key.name] = key.value;
                //     break;

                // Find the linked resource and use it as a variable
                case 'resource':
                    // eslint-disable-next-line no-case-declarations
                    const linkedBlocks = connections.find(
                        (x) =>
                            x.target === primary.id &&
                            x.targetHandle.includes(key.id),
                    );

                    if (linkedBlocks) {
                        resource[
                            key.name
                        ] = `$${linkedBlocks.sourceHandle}.${linkedBlocks.source}.${linkedBlocks.data.value}`;
                    }

                    break;

                // Find the linked resources and add them as a nested block object
                case 'block':
                    // eslint-disable-next-line no-case-declarations
                    const linkedBlocksArr = connections.filter(
                        (x) =>
                            x.target === primary.id &&
                            x.targetHandle === key.id,
                    );

                    if (linkedBlocksArr.length) {
                        resource[key.name] = {};

                        linkedBlocksArr.forEach((link) => {
                            // Find the block linked in the connection
                            const linkRes = blockResources.find(
                                (x) => x.id === link.source,
                            );

                            // Return if connection is using an invalid resource
                            if (!linkRes) {
                                return res.status(400).send({
                                    status: 400,
                                    error: 'Resource referenced in block connection does not exist',
                                });
                            }

                            // Tags are handled differently from the normal blocks since the key value is set by the user as well
                            if (linkRes?.resourceState.type === 'tags') {
                                const tagName = linkRes.resourceState.keys.find(
                                    (x) => x.name === 'name',
                                ) as IResourceKeyState;
                                const tagValue =
                                    linkRes.resourceState.keys.find(
                                        (x) => x.name === 'value',
                                    ) as IResourceKeyState;

                                if (tagName) {
                                    const tagBlock = resource[
                                        key.name
                                    ] as IBlock;
                                    tagBlock[tagName.value] = tagValue.value;
                                }
                            } else {
                                // Create a ref to the nested block
                                const blockResource = resource[
                                    key.name
                                ] as IBlock;

                                linkRes.resourceState.keys.forEach((x) => {
                                    // console.log(JSON.stringify(x));
                                    switch (x.type) {
                                        // Just assign the value to the key
                                        case 'string':
                                            blockResource[x.name] = x.value;
                                            break;

                                        case 'block':
                                            blockResource[x.name] = {};
                                            // eslint-disable-next-line no-case-declarations
                                            const nestedLinkedCon =
                                                connections.filter(
                                                    (z) =>
                                                        z.target ===
                                                            linkRes.id &&
                                                        z.targetHandle === x.id,
                                                );

                                            nestedLinkedCon.forEach((link) => {
                                                const nestedBlockResource =
                                                    blockResource[
                                                        x.name
                                                    ] as IBlock;

                                                const linkRes =
                                                    blockResources.find(
                                                        (x) =>
                                                            x.id ===
                                                            link.source,
                                                    );

                                                if (!linkRes) {
                                                    return res
                                                        .status(400)
                                                        .send({
                                                            status: 400,
                                                            error: 'Resource referenced in block connection does not exist',
                                                        });
                                                }

                                                linkRes.resourceState.keys.forEach(
                                                    (x) => {
                                                        console.log(x.type);
                                                        switch (x.type) {
                                                            // Just assign the value to the key
                                                            case 'string':
                                                                nestedBlockResource[
                                                                    x.name
                                                                ] = x.value;
                                                                break;
                                                        }
                                                    },
                                                );
                                            });
                                    }
                                });
                            }
                        });
                    }
                    break;
            }
        });
    });

    let result: string = hcl.stringify(JSON.stringify(input));

    // Replace references to other variables so its valid - "$a.b.c" => a.b.c
    result = result.replace(/"\$([^"]*)"/gm, '$1');

    // Remove double quotes from key string names - "location" = "UK South" -> location = "UK South"
    result = result.replace(/"(\w+)" =/gm, '$1 =');

    // Do the same but with the word "resource" in resource blocks - "resource" "azurerm_resource_group" "oyexm" -> resource "azurerm_resource_group" "oyexm"
    result = result.replace(/"resource"/gm, 'resource');

    // You have to define a block not assign a value -> generate doesn't do this
    result = result.replace('terraform = {', 'terraform {');
    result = result.replace('required_providers = {', 'required_providers {');

    // logger.info('app.ts', result);

    // return res.send({
    //     status: 'success',
    //     result,
    // });

    return res.send({
        status: 200,
        hcl: {
            main: result,
        },
        datetime: new Date().toISOString(),
    });
});

app.get('*', (req: Request, res: Response) => {
    return res.status(404).send();
});

export { app };
