import express from 'express';
import { home } from '../../controller';

const route = express.Router();

route.get('/', home.index);

export default route