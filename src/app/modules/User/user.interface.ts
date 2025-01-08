/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { USER_ROLE, USER_STATUS } from './user.constant';

export type TUser = {
  _id: Types.ObjectId;
  name: string;
  role: keyof typeof USER_ROLE;
  email: string;
  password: string;
  status: keyof typeof USER_STATUS;
  passwordChangedAt?: Date;
  mobileNumber?: string;
  profilePhoto?: string;
  bio?: string; // Short bio or description of the user (optional)
  isVerified: boolean; // Indicates whether the user is verified
  premiumStatus: boolean; // Indicates whether the user has premium access
  followers?: Types.ObjectId[]; // Array of user IDs who follow this user
  following?: Types.ObjectId[]; // Array of user IDs this user is following
  posts?: Types.ObjectId[]; // Array of post IDs created by the user
  favorites?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
