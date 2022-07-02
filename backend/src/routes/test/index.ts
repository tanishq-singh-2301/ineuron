import express from 'express';
import { test } from '../../controller';

const route = express.Router();

route.get('/', test.index);
route.get('/hi', test.hi)

export default route