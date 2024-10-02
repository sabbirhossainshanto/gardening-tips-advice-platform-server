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
  const posts = await postService.getUserPostFromDB(req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Posts are retrieve Successfully',
    data: posts,
  });
});

const getSingleUserPosts = catchAsync(async (req, res) => {
  const posts = await postService.getSingleUserPostsFromDB(req?.params?.userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Posts are retrieve Successfully',
    data: posts,
  });
});
const getAllPost = catchAsync(async (req, res) => {
  const posts = await postService.getAllPostFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Posts are retrieve Successfully',
    data: posts,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const posts = await postService.getSinglePostFromDB(postId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Posts is retrieve Successfully',
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

const getUpvotersForMyPosts = catchAsync(async (req, res) => {
  const upvoters = await postService.getUpvotersForMyPosts(req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Upvoters retrieved successfully',
    data: upvoters,
  });
});

const bookmarkFavoritePost = catchAsync(async (req, res) => {
  const { message, result } = await postService.bookmarkFavoritePost(
    req.body,
    req.user
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: message,
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const vote = await postService.deletePostFromDB(postId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post deleted successfully',
    data: vote,
  });
});

export const postController = {
  createPost,
  getUserPost,
  updatePostVote,
  deletePost,
  bookmarkFavoritePost,
  getAllPost,
  getSinglePost,
  getSingleUserPosts,
  getUpvotersForMyPosts,
};
