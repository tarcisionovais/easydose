import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { AppError } from "../errors/AppError";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction)  => {
    if (!req.headers.authorization){
        return next(new AppError('Token not found! Please inform.', 401));
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token as string, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
        
        if (err){
            return next(new AppError('Invalid or expired token', 401));
        }

        req.user_id = decoded.id;

        return next();
    });
}