import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { commentService } from './comment.service';

const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createCommentInToDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully commented in this post',
    data: comment,
  });
});

const getAllComment = catchAsync(async (req, res) => {
  const comment = await commentService.getAllCommentFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comments are retrieved successfully!',
    data: comment,
  });
});

const getSingleComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const comment = await commentService.getSingleCommentFromDB(commentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comments is retrieved successfully!',
    data: comment,
  });
});

const editComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const comment = await commentService.editCommentInToDB(commentId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment is  updated successfully!',
    data: comment,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const comment = await commentService.deleteCommentFromDB(commentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment is  deleted successfully!',
    data: comment,
  });
});

export const commentController = {
  createComment,
  getAllComment,
  editComment,
  getSingleComment,
  deleteComment,
};
