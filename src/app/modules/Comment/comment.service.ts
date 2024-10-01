import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { IComment } from './comment.interface';
import { Comment } from './comment.model';
import { Post } from '../Post/post.model';

const createCommentInToDB = async (payload: IComment) => {
  const isUserExist = await User.findById(payload.user);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not exist');
  }

  const isPostExist = await Post.findById(payload.post);
  if (!isPostExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This post  is not exist');
  }
  payload.postUser = isPostExist.user;
  const result = await Comment.create(payload);
  return result;
};

const getAllCommentFromDB = async () => {
  const result = await Comment.find()
    .populate('user')
    .populate('postUser')
    .populate('post');
  return result;
};

const getSingleCommentFromDB = async (id: string) => {
  const result = await Comment.findById(id)
    .populate('user')
    .populate('postUser')
    .populate('post');
  return result;
};

const editCommentInToDB = async (id: string, payload: Partial<IComment>) => {
  const isUserExist = await User.findById(payload.user);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not exist');
  }

  const isPostExist = await Post.findById(payload.post);
  if (!isPostExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This post  is not exist');
  }
  const result = await Comment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate('user')
    .populate('postUser')
    .populate('post');
  return result;
};

const deleteCommentFromDB = async (id: string) => {
  const isCommentExist = await Comment.findById(id);
  if (!isCommentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This comment is not exist');
  }

  return await Comment.findByIdAndDelete(id, {
    new: true,
    runValidators: true,
  });
};

export const commentService = {
  createCommentInToDB,
  getAllCommentFromDB,
  editCommentInToDB,
  getSingleCommentFromDB,
  deleteCommentFromDB,
};
