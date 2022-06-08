import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getCustomRepository } from "typeorm"
import { UsersRepository } from '../repositories/user.repository';
import { AppError } from '../errors/AppError';

export const loginUser = async (email: string, password: string) => {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findByEmail(email);

    if (!user){
        throw new AppError("Email not found", 404)
    }

    if (!bcrypt.compareSync(password, user.password)){
        throw new AppError("Wrong password", 401)
    }

    const token = jwt.sign(
            { id: user.uuid }, 
            process.env.JWT_SECRET as string, 
            { expiresIn: '1d' }
        );

    return token;
}