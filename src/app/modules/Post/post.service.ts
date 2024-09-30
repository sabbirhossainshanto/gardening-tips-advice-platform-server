import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { IUpdateVote, TPost } from './post.interface';
import { Post } from './post.model';
import { ObjectId } from 'mongodb';

const createPostToDB = async (payload: TPost) => {
  const isUserExist = await User.findById(payload.user);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const post = await Post.create(payload);
  await User.findByIdAndUpdate(
    payload.user,
    { $addToSet: { posts: post._id } },
    { new: true }
  );

  return post;
};

const getUserPostFromDB = async (email: string) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const post = await Post.find({ user: isUserExist._id });

  return post;
};

const updateVote = async (payload: IUpdateVote) => {
  const isUserExist = await User.findOne({ _id: payload.userId });
  const isPostExist = await Post.findOne({ _id: payload.postId });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!isPostExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }
  if (payload.voteType === 'upvote') {
    const findUser = isPostExist?.upvotes?.find((upvote) => {
      return upvote.equals(new ObjectId(payload.userId));
    });
    if (findUser) {
      // remove the user from upvote array
      const result = await Post.findByIdAndUpdate(payload.postId, {
        $pull: { upvotes: payload.userId },
      });
      return result;
    } else {
      // push the user to upvote array
      const result = await Post.findByIdAndUpdate(payload.postId, {
        $addToSet: { upvotes: payload.userId },
      });
      return result;
    }
  }

  if (payload.voteType === 'downvote') {
    const findUser = isPostExist?.downvotes?.find((downvote) => {
      return downvote.equals(new ObjectId(payload.userId));
    });
    if (findUser) {
      // remove the user from upvote array
      const result = await Post.findByIdAndUpdate(
        payload.postId,
        {
          $pull: { downvotes: payload.userId },
        },
        { new: true }
      );
      return result;
    } else {
      // push the user to upvote array
      const result = await Post.findByIdAndUpdate(
        payload.postId,
        {
          $addToSet: { downvotes: payload.userId },
        },
        { new: true }
      );
      return result;
    }
  }
};

export const postService = {
  createPostToDB,
  getUserPostFromDB,
  updateVote,
};
