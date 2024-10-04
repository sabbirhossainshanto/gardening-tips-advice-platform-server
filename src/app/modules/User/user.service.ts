import { JwtPayload } from 'jsonwebtoken';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Post } from '../Post/post.model';
import { VerifyProfile } from '../VerifyProfile/verifyProfile.model';
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

const getMonthlyStats = async () => {
  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  const oneMonthAgo = new Date(currentDate);
  oneMonthAgo.setMonth(currentDate.getMonth() - 1);

  // Total user count
  const totalUsers = await User.countDocuments();

  // Users created today
  const todayUsers = await User.countDocuments({
    createdAt: {
      $gte: new Date().setHours(0, 0, 0, 0), // Beginning of today
      $lte: currentDate, // Current time
    },
  });

  // Users created in the last 7 days
  const lastSevenDaysUsers = await User.countDocuments({
    createdAt: {
      $gte: sevenDaysAgo,
      $lte: currentDate,
    },
  });

  // Users created in the last month
  const lastMonthUsers = await User.countDocuments({
    createdAt: {
      $gte: oneMonthAgo,
      $lte: currentDate,
    },
  });

  // Total posts count
  const totalPosts = await Post.countDocuments();

  // Posts created today
  const todayPosts = await Post.countDocuments({
    createdAt: {
      $gte: new Date().setHours(0, 0, 0, 0),
      $lte: currentDate,
    },
  });

  // Posts created in the last 7 days
  const lastSevenDaysPosts = await Post.countDocuments({
    createdAt: {
      $gte: sevenDaysAgo,
      $lte: currentDate,
    },
  });

  // Posts created in the last month
  const lastMonthPosts = await Post.countDocuments({
    createdAt: {
      $gte: oneMonthAgo,
      $lte: currentDate,
    },
  });

  // Total verified users count
  const totalVerifiedUsers = await VerifyProfile.countDocuments();

  // Verified users created today
  const todayVerifiedUsers = await VerifyProfile.countDocuments({
    date: {
      $gte: new Date().setHours(0, 0, 0, 0),
      $lte: currentDate,
    },
  });

  // Verified users in the last 7 days
  const lastSevenDaysVerifiedUsers = await VerifyProfile.countDocuments({
    date: {
      $gte: sevenDaysAgo,
      $lte: currentDate,
    },
  });

  // Verified users in the last month
  const lastMonthVerifiedUsers = await VerifyProfile.countDocuments({
    date: {
      $gte: oneMonthAgo,
      $lte: currentDate,
    },
  });

  // Total money of verified users
  const totalVerifiedUserPayments = await VerifyProfile.aggregate([
    {
      $group: {
        _id: null,
        totalMoney: { $sum: '$amount' },
      },
    },
  ]);

  return {
    userStats: {
      totalUsers,
      todayUsers,
      lastSevenDaysUsers,
      lastMonthUsers,
    },
    postStats: {
      totalPosts,
      todayPosts,
      lastSevenDaysPosts,
      lastMonthPosts,
    },
    verifiedUserStats: {
      totalVerifiedUsers,
      todayVerifiedUsers,
      lastSevenDaysVerifiedUsers,
      lastMonthVerifiedUsers,
      totalVerifiedUserPayments: totalVerifiedUserPayments[0]?.totalMoney || 0,
    },
  };
};

export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUser,
  getMonthlyStats,
};
