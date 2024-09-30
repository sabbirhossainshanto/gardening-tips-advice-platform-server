import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { followService } from './follow.service';

const followUser = catchAsync(async (req, res) => {
  const { message, result } = await followService.followUser(req.user,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: message,
    data: result,
  });
});

export const followController = {
  followUser,
};
