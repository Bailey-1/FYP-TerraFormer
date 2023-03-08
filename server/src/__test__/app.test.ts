import request from 'supertest';
import { describe } from 'mocha';
import { app } from '../app';
import { expect } from 'chai';

describe('GET /api/status - User can get status', function () {
    describe('Plain request', function () {
        it('Should return 200', (done) => {
            request(app).get('/api/status').expect(200, done);
        });
    });
});

describe('POST /api/generateHcl - User can generate HCL', function () {
    describe('When using an empty request body', function () {
        it('Should return 400', (done) => {
            request(app).post('/api/generateHcl').expect(400, done);
        });
    });

    describe('When using an empty body arrays', function () {
        it('Should return 400', async function () {
            const response = await request(app).post(`/api/generateHcl`).send({
                resources: [],
                edges: [],
            });

            expect(response.status).to.equal(400);
        });
    });
});
