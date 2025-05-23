import config from '../../config';
import bcrypt from 'bcrypt';
import { User } from './user.model';
import ApiError from '../../error/ApiError';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const createUserIntoDB = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  return newUser;
};

const loginUser = async (email: string, password: string) => {
  // Step 1: Check if the user exists
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  // Step 2: Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid password!');
  }

  // Step 3: Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: '1d' }
  );

  // Step 4: Get user without password
  const userWithoutPassword = await User.findById(user._id).select('-password');

  return {
    token,
    user: userWithoutPassword,
  };
};


export const UserService = {
  createUserIntoDB,
  loginUser,
};
