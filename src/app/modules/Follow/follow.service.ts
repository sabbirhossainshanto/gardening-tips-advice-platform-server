import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { ObjectId } from 'mongodb';
import { JwtPayload } from 'jsonwebtoken';

const followUser = async (
  user: JwtPayload,
  payload: { followingId: string }
) => {
  // checking if the user is exist
  const followerUser = await User.findById(user?._id);

  if (!followerUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'Follower user is not found!');
  }
  const followingUser = await User.findById(payload?.followingId);

  if (!followingUser) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Following user user is not found!'
    );
  }

  const isAlreadyFollowed = followingUser?.followers?.find((user) => {
    return user.equals(new ObjectId(user?._id));
  });

  if (isAlreadyFollowed) {
    const result = await User.findByIdAndUpdate(
      payload?.followingId,
      {
        $pull: { followers: user?._id },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      user?._id,
      {
        $pull: { following:payload?.followingId},
      },
      { new: true }
    );

    return {
      result,
      message: 'unfollow the user successful',
    };
  } else {
    const result = await User.findByIdAndUpdate(
      payload?.followingId,
      {
        $addToSet: { followers: user?._id },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      user?._id,
      {
        $addToSet: { following: payload?.followingId },
      },
      { new: true }
    );
    return {
      result,
      message: 'Follow the user successful',
    };
  }
};

export const followService = {
  followUser,
};
