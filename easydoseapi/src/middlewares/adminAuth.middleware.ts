import { Request, Response, NextFunction } from 'express';
import { AppError } from "../errors/AppError";
import { currentUser } from "../services/user.service";

export const isAdmin = async (req: Request, res: Response, next: NextFunction)  => {
    const id = req.user_id;
    try {
        const user = await currentUser(id);

        if(!user.isAdmin){
            return next(new AppError('Only admin can access this route.', 400));
        }
        return next()   
    }
    catch (error) {
        next(new AppError('Invalid access.', 400))
    }
}