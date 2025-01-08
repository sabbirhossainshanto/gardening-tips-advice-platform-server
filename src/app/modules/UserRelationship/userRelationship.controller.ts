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

export const relationshipController = {
  createRelationship,
};
