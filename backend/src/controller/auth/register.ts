import { Request, Response } from 'express';
import App from '../../database/index';
import zod from 'zod';

const handler = async (req: Request, res: Response) => {
    const { body } = req;

    if (!body) return res.json({ success: false, error: "Body missing" });

    const { username, email, password } = body;

    const checkUserData = zod.object({
        username: zod.string().min(5, "Minimun username length is 5").max(30, "Maximum username length is 30"),
        email: zod.string().email("Enter a valid email address"),
        password: zod.string().min(8, "Minimun password length is 8").max(32, "Maximum password length is 32")
    });

    const user = checkUserData.parse(body)
}

export default handler;