import { app } from './app';

const start = async () => {
    console.log('Starting server');
    app.listen(8080, () => {
        console.log('Server started');
    });
};

start();
