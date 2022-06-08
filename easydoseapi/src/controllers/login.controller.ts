import { Request, Response } from "express";
import { loginUser } from "../services/login.service";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await loginUser(email, password);

    res.send({ token });
}