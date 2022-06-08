import { Request, Response, NextFunction } from 'express';
import { AppError } from "../errors/AppError";
import { currentUser } from "../services/user.service";

export const isOwner = async (req: Request, res: Response, next: NextFunction)  => {
    const id = req.user_id;
    const { uuid } = req.params;

    const userExists = await currentUser(uuid);
    const isAdminUser = await currentUser(id);

    if (isAdminUser.isAdmin){
        return next();
    }

    if(id !== uuid){
        return next(new AppError('Only the owner/admin can update or delete.', 400));
    }
    return next();
}