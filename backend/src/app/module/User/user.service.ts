import config from '../../config';
import { User } from './user.model';
import bcrypt from 'bcrypt';


const createUserIntoDB = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, config.bcrypt_salt_rounds as string);

    const newUser = await User.create({
        email,
        password: hashedPassword,
    });

    return newUser;
};


export const UserService = {
    createUserIntoDB,
};
