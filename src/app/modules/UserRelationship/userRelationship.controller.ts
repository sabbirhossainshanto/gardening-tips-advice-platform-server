import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { relationShipService } from './userRelationship.service';

const createRelationship = catchAsync(async (req, res) => {
  const result = await relationShipService.createRelationShip(
    req.user,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Relation ship created successfully',
    data: result,
  });
});
const getPendingFriendRequest = catchAsync(async (req, res) => {
  const result = await relationShipService.getPendingFriendRequest(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pending friend request retrieved successfully',
    data: result,
  });
});

const updatePendingFriend = catchAsync(async (req, res) => {
  const result = await relationShipService.updatePendingFriend(
    req.user,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Friend request updated successfully',
    data: result,
  });
});
const getMyFriend = catchAsync(async (req, res) => {
  const result = await relationShipService.getMyFriend(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'friends are retrieved successfully',
    data: result,
  });
});
const getMyFollowers = catchAsync(async (req, res) => {
  const result = await relationShipService.getMyFollowers(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Followers retrieved successfully',
    data: result,
  });
});
const getMyFollowing = catchAsync(async (req, res) => {
  const result = await relationShipService.getMyFollowings(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Following retrieved successfully',
    data: result,
  });
});
const getSingleFollowing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await relationShipService.getSingleFollowings(req.user, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Following retrieved successfully',
    data: result,
  });
});
const unFollowUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await relationShipService.unFollowUser(req.user, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unfollow user successfully',
    data: result,
  });
});

export const relationshipController = {
  createRelationship,
  getMyFollowers,
  getMyFollowing,
  unFollowUser,
  getPendingFriendRequest,
  getSingleFollowing,
  getMyFriend,
  updatePendingFriend,
};
