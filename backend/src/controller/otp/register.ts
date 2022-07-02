import { Request, Response } from 'express';
import App from '../../database/index';

const handler = async (req: Request, res: Response) => {
    res.send("hey hi he")
}

export default handler;