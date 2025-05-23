import { Model, Types } from 'mongoose';

export interface TUser {
  _id?: Types.ObjectId;
  email: string;
role: "user" | "admin"
  password: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistById(_id: string): Promise<TUser | null>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
