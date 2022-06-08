import { Request, Response, NextFunction } from "express";
import { createUser, currentUser, deleteUser, listAllUsers, updateUser } from "../services/user.service";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createUser(req.body);
        res.send(user);
    }
    catch (error) {
        next(error);
    }
}

export const listAll = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const users = await listAllUsers();
        res.send(users)    
    }
    catch (error){
        next(error)
    }
}

export const loggedUser = async ( req: Request, res: Response, next: NextFunction ) => {
    const id = req.user_id;
    try {
        const user = await currentUser(id);
        res.send(user);  
    }
    catch (error) {
        next(error)
    }
}

export const update = async ( req: Request, res: Response, next: NextFunction ) => {
    const { uuid } = req.params;

    try {
        const userUpdated = await updateUser(uuid, req.body);
        res.send(userUpdated);
    }
    catch (error) {
        next(error)
    }
}


export const destroy = async ( req: Request, res: Response, next: NextFunction ) => {
    const { uuid } = req.params;

    try {
        await deleteUser(uuid);
        res.send({"message": "User deleted with success"});
    }
    catch (error) {
        next(error)
    }
}
