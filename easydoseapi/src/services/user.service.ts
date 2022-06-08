import { UsersRepository } from "../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";

interface UserBody {
    uuid?: string;
    name?: string;
    email?: string;
    password?: string;
    isAdmin?: boolean;
    createdOn?: Date | string;
    updatedOn?: Date | string;
}

export const createUser = async (body: UserBody) => {
    const { name, email, password, isAdmin } = body;
    
    try {
        const usersRepository = getCustomRepository(UsersRepository);
        
        const emailAlreadyExists = await usersRepository.findOne({ email });

        if (emailAlreadyExists) {
            throw new AppError("E-mail already registered", 400);
        }

        const user = usersRepository.create({
            name,
            email,
            password,
            isAdmin
        });

        await usersRepository.save(user);

        const output = {
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdOn: user.createdOn,
            updatedOn: user.updatedOn
        }

        return output;
    } 
    catch (error) {
        throw new AppError((error as any).message, 400)
    }
}

export const listAllUsers = async () => {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.createQueryBuilder("users")
                                .select([
                                    "users.uuid",
                                    "users.name",
                                    "users.email",
                                    "users.isAdmin",
                                    "users.createdOn",
                                    "users.updatedOn"
                                ])
                                .getMany();

    return users;
}

export const currentUser = async (id: string | undefined) => {
    try {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findOne(id);
        console.log("iu")
        if (!user){
            throw new AppError("User not found", 401)
        }

        const output = {
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdOn: user.createdOn,
            updatedOn: user.updatedOn
        }

        return output;
    }

    catch (error) {
        throw new AppError((error as any).message, 401)
    }  
}

export const updateUser = async (id: string, data: UserBody) => {
    data.updatedOn = new Date();

    if (data.hasOwnProperty('isAdmin')){
        delete data.isAdmin
    }

    try {
        const usersRepository = getCustomRepository(UsersRepository);
        const updateResult = await usersRepository.update({uuid: id}, { ...data});
        const user = await currentUser(id);
        
        return user;
    }

    catch (error) {
        throw new AppError((error as any).message, 401)
    } 
}

export const deleteUser = async (id: string) => {
    try {
        const usersRepository = getCustomRepository(UsersRepository);
        const userExists = await currentUser(id)
        await usersRepository.delete(id); 
    }
    catch (error) {
        throw new AppError((error as any).message, 401)
    }   
}