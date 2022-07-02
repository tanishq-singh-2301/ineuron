import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

/* FETCH USER DATA, AND ASSIGN THEM WITH JWT TOKEN*/
const handler = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.header('Authentication') as string).split("Bearer ")[1];

    if (token) {
        try {
            const str = verify(token, process.env.JWT_SECRECT as string);

            // @ts-ignore
            req.user = str.user;
            next();
        } catch (error) {
            res.json({ error: 'Please authenticate using a valid token' });
        }
    } else {
        res.json({ error: 'Please authenticate using a valid token' });
    }
};

export default handler;