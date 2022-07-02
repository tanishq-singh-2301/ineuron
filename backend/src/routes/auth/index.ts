import express from 'express';
import { auth } from '../../controller';
import otp from '../otp';

const route = express.Router();

/** INDEEX */
route.get('/', auth.index);

/** LOGIN - get jwt  sign token */
route.get('/login', auth.login);

/** REGISTER - create user */
route.post('/register', auth.register);

/** OPT - Generation */
route.use("/otp", otp)

export default route;