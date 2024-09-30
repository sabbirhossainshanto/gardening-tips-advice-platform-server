import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { postService } from './post.service';

const createPost = catchAsync(async (req, res) => {
  const user = await postService.createPostToDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Created Successfully',
    data: user,
  });
});

const getUserPost = catchAsync(async (req, res) => {
  const { email } = req.params;
  const posts = await postService.getUserPostFromDB(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Posts are retrieve Successfully',
    data: posts,
  });
});

const updatePostVote = catchAsync(async (req, res) => {

    const vote = await postService.updateVote(req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Post vote updated successfully',
      data: vote,
    });
  });

export const postController = {
  createPost,
  getUserPost,
  updatePostVote
};
