import { Request, Response } from 'express';
import App from '../../database/index';
import randomNumber from '../../lib/basic/randomNumber';
import encrypt from '../../lib/cipher/encode';

const handler = async (req: Request, res: Response) => {
    res.send("hey hi he")
}

export default handler;