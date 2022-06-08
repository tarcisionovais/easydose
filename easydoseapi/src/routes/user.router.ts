import { Router } from "express";
import { create, destroy, listAll, loggedUser, update } from "../controllers/user.controller";
import { isAdmin } from "../middlewares/adminAuth.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { isOwner } from "../middlewares/ownerAuth.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { UserSchema } from "../schemas/user.schema";

const router = Router();

export const userRouter = () => {
    router.post('', validateSchema(UserSchema), create);
    router.get('', isAuthenticated, isAdmin, listAll);
    router.get('/profile', isAuthenticated, loggedUser);
    router.patch('/:uuid', isAuthenticated, isOwner, update);
    router.delete('/:uuid', isAuthenticated, isOwner, destroy);
    
    return router
}