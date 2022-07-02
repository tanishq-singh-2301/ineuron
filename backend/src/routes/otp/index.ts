import express from 'express';
import { otp } from '../../controller';

const route = express.Router();

/** INDEEX */
route.get('/', otp.index);

/** LOGIN - generate otp for login  */
route.get('/login', otp.login);

/** REGISTER - generate otp for regiatration time */
route.post('/register', otp.register);

export default route;