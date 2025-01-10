import { IUserRelationship } from './userRelationship.interface';
import { UserRelationship } from './userRelationship.model';
import { TUser } from '../User/user.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createRelationShip = async (user: TUser, payload: IUserRelationship) => {
  payload.user = user?._id;
  const result = await UserRelationship.create(payload);
  return result;
};

const getPendingFriendRequest = async (user: TUser) => {
  const result = await UserRelationship.find({
    targetUser: user?._id,
    relationshipType: 'friend',
    friendRequestStatus: 'pending',
  }).populate('user');
  return result;
};
const updatePendingFriend = async (
  user: TUser,
  payload: { type: 'accept' | 'reject'; userId: string }
) => {
  if (payload?.type === 'accept') {
    const result = await UserRelationship.findOneAndUpdate(
      {
        targetUser: user?._id,
        user: payload.userId,
        relationshipType: 'friend',
        friendRequestStatus: 'pending',
      },
      {
        friendRequestStatus: 'accepted',
      }
    ).populate('user');
    return result;
  }
  if (payload?.type === 'reject') {
    const result = await UserRelationship.findOneAndDelete({
      targetUser: user?._id,
      user: payload?.userId,
      relationshipType: 'friend',
      friendRequestStatus: 'pending',
    }).populate('user');
    return result;
  }
};
const getMyFriend = async (user: TUser) => {
  const result = await UserRelationship.find({
    targetUser: user?._id,
    relationshipType: 'friend',
    friendRequestStatus: 'accepted',
  }).populate('user');
  return result;
};

const getMyFollowers = async (user: TUser) => {
  const result = await UserRelationship.find({
    targetUser: user?._id,
    relationshipType: 'follow',
    isFollower: true,
  }).populate('user');
  return result;
};
const getMyFollowings = async (user: TUser) => {
  const result = await UserRelationship.find({
    user: user?._id,
    relationshipType: 'follow',
    isFollowing: true,
  })
    .populate('user')
    .populate('targetUser');
  return result;
};
const getSingleFollowings = async (user: TUser, id: string) => {
  const result = await UserRelationship.findOne({
    user: user?._id,
    targetUser: id,
    relationshipType: 'follow',
    isFollowing: true,
  })
    .populate('user')
    .populate('targetUser');
  return result;
};

const unFollowUser = async (user: TUser, id: string) => {
  const followingUser = await UserRelationship.findOne({
    targetUser: id,
  });
  if (!followingUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'Following user not found');
  }

  const result = await UserRelationship.findOneAndDelete({
    targetUser: id,
    user: user?._id,
    relationshipType: 'follow',
    isFollowing: true,
  });
  return result;
};

export const relationShipService = {
  createRelationShip,
  getMyFollowers,
  getMyFollowings,
  unFollowUser,
  getPendingFriendRequest,
  getSingleFollowings,
  getMyFriend,
  updatePendingFriend,
};
