import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { verifyProfileService } from './verifyProfile.service';

const verifyProfile = catchAsync(async (req, res) => {
  const result = await verifyProfileService.verifyProfile(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your profile verified successfully',
    data: result,
  });
});

export const verifyProfileController = {
  verifyProfile,
};
