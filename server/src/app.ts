import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import hcl from 'js-hcl-parser';

const app = express();

app.use(morgan('dev'));
app.set('trust proxy', true);
app.use(express.json());
app.use(cors());

app.use('/api/jsonToHcl', (req, res) => {
    const input = {
        resource: {
            azurerm_resource_group: {
                staging_rg: {
                    name: 'Classrooms-Staging',
                    location: 'UK South',
                },
            },
            azurerm_container_registry: {
                acr: {
                    name: 'stg-classrooms-cr',
                    resource_group_name:
                        '$azurerm_resource_group.staging_rg.name', // Have to reference other variables using this
                    location: '$azurerm_resource_group.staging_rg.location',
                    sku: 'Basic',
                },
            },
        },
    };

    let result: string = hcl.stringify(JSON.stringify(input));

    result = result.replace(/"\$([^"]*)"/gm, '$1'); // Replace references to other variables so its valid - "$a.b.c" => a.b.c

    return res.send(result);
});

export { app };
