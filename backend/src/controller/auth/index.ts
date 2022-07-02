import { Request, Response } from 'express';
import login from './login';
import register from './register';

const index = async (req: Request, res: Response) => {
    res.send("hey hi auth")
}

export default {
    index,
    login,
    register
};