import { Request, Response } from 'express';

const index = async (req: Request, res: Response) => {
    res.send("hey hi")
}

export default {
    index
}