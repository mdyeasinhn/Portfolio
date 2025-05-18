import config from '../../config';

import bcrypt from 'bcrypt';
import { User } from './user.model';
import { Types } from 'mongoose';
import ApiError from '../../error/ApiError';
import { StatusCodes } from 'http-status-codes';


const createUserIntoDB = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, config.bcrypt_salt_rounds as number);

    const newUser = await User.create({
        email,
        password: hashedPassword,
    });

    return newUser;
};



const loginUser = async (email: string, password: string) => {

    // Step 1: Check if the user exists
    const user = await User.findOne({ email }).select('+password'); // Include password
    console.log('user', user)

    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
    }

    // Step 2: Verify the password
    const isPasswordValid = await User.isPasswordMatched(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid password!');
    }

    // Step 3: Re-fetch the user WITHOUT password
    const userWithoutPassword = await User.findById(user._id).select('-password');

    return userWithoutPassword;
};


export const UserService = {
    createUserIntoDB,
     loginUser
};
