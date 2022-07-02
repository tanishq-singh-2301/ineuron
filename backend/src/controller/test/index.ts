import { Request, Response } from 'express';
import hi from './hi';

const index = async (req: Request, res: Response) => {
    res.send("hey hi test")
}

export default {
    index,
    hi
};