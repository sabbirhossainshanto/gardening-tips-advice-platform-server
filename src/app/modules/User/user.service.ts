import { JwtPayload } from 'jsonwebtoken';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsersFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload
) => {
  const users = new QueryBuilder(
    User.find({ _id: { $ne: user?._id } })
      .populate('followers')
      .populate('following')
      .populate('posts')
      .populate('favorites'),
    query
  )
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

const updateUser = async (
  id: string,
  data: Partial<{ role: 'USER' | 'ADMIN'; status: 'ACTIVE' | 'BLOCKED' }>
) => {
  const profile = await User.findById(id);

  if (!profile) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exits!');
  }

  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUser,
};
