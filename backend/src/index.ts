import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { route } from './routes';

// @ts-ignore
import cors from 'cors/lib'

const app = express();
dotenv.config();

app.use(cors({
    origin: "*"
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', route);

app.listen(3000, () => { console.log(`Server is running on http://localhost:3000`) });