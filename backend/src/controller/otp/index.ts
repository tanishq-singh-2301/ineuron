import { Request, Response } from 'express';
import login from './login';
import register from './register';
import App from '../../database/index';

const index = async (req: Request, res: Response) => {
    res.send("hey hi otp")
}

export default {
    index,
    login,
    register
}