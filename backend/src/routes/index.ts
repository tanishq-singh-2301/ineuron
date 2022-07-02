import express from 'express';
import homeRoutes from './home';
import testRoutes from './test';

const route = express.Router();

route.use('/', homeRoutes);
route.use('/test', testRoutes);

export { route };