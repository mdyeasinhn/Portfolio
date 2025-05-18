import { Model } from "mongoose";

export interface TUser {
    id: string;
    email: string;
    password: string;
}
export interface UserModel extends Model<TUser> {
 // myStaticMethod(): number;
 isUserExistByCustomId(id : string) : Promise<TUser>;
 isPasswordMatched(plainTextPassword : string, hashedPassword :string) :Promise<boolean>;
 isJWTIssuedBeforePasswordChanged(
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
): boolean;
};