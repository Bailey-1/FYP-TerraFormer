import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.set('trust proxy', true);
app.use(express.json());
app.use(cors());

app.use('/api', (req, res) => {
    return res.send('This works');
});

export { app };
