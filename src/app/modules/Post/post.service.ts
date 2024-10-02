import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { IUpdateVote, TPost } from './post.interface';
import { Post } from './post.model';
import { ObjectId } from 'mongodb';
import { JwtPayload } from 'jsonwebtoken';

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

const getUserPostFromDB = async (user: JwtPayload) => {
  const isUserExist = await User.findById(user._id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const post = await Post.find({ user: isUserExist._id })
    .populate('upvotes')
    .populate('downvotes')
    .populate('user');

  return post;
};

const getSingleUserPostsFromDB = async (id: string) => {
  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const posts = await Post.find({ user: isUserExist._id })
    .populate('upvotes')
    .populate('downvotes')
    .populate('user');

  return posts;
};

const getAllPostFromDB = async () => {
  const post = await Post.find()
    .populate('upvotes')
    .populate('downvotes')
    .populate({
      path: 'user',
      populate: {
        path: 'followers',
      },
    })
    .populate({
      path: 'user',
      populate: {
        path: 'following',
      },
    })
    .populate({
      path: 'user',
      populate: {
        path: 'posts',
      },
    });

  return post;
};
const getSinglePostFromDB = async (id: string) => {
  const post = await Post.findById(id)
    .populate('upvotes')
    .populate('downvotes')
    .populate({
      path: 'user',
      populate: {
        path: 'followers',
      },
    })
    .populate({
      path: 'user',
      populate: {
        path: 'following',
      },
    })
    .populate({
      path: 'user',
      populate: {
        path: 'posts',
      },
    });

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

  /* Find already up voted  */
  const isAlreadyUpVoted = isPostExist?.upvotes?.find((upvote) => {
    return upvote.equals(new ObjectId(payload.userId));
  });

  /* Find already down voted  */
  const isAlreadyDownVoted = isPostExist?.downvotes?.find((downvote) => {
    return downvote.equals(new ObjectId(payload.userId));
  });

  if (payload.voteType === 'upvote') {
    if (isAlreadyUpVoted) {
      // remove the user from upvote array
      const result = await Post.findByIdAndUpdate(
        payload.postId,
        {
          $pull: { upvotes: payload.userId },
        },
        { new: true }
      );

      return result;
    } else {
      // remove the user form downvote array if available
      if (isAlreadyDownVoted) {
        await Post.findByIdAndUpdate(
          payload.postId,
          {
            $pull: { downvotes: payload.userId },
          },
          { new: true }
        );
      }
      // push the user to upvote array
      const result = await Post.findByIdAndUpdate(
        payload.postId,
        {
          $addToSet: { upvotes: payload.userId },
        },
        { new: true }
      );
      return result;
    }
  }

  if (payload.voteType === 'downvote') {
    if (isAlreadyDownVoted) {
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
      // remove the user from upvote array
      if (isAlreadyUpVoted) {
        await Post.findByIdAndUpdate(
          payload.postId,
          {
            $pull: { upvotes: payload.userId },
          },
          { new: true }
        );
      }
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

const bookmarkFavoritePost = async (
  payload: { postId: string },
  user: JwtPayload
) => {
  const isPostExist = await Post.findOne({ _id: payload.postId });
  const isUserExist = await User.findOne({ _id: user?._id });

  if (!isPostExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  /* Find already bookmarked this post  */
  const isAlreadyBookmarked = isUserExist?.favorites?.find((favorite) => {
    return favorite.equals(new ObjectId(payload.postId));
  });

  if (isAlreadyBookmarked) {
    // remove the bookmark from favorites array
    const result = await User.findByIdAndUpdate(
      user?._id,
      {
        $pull: { favorites: payload.postId },
      },
      { new: true }
    );

    return {
      result,
      message: 'Removed bookmark post successfully!',
    };
  } else {
    // push the post id to favorites array
    const result = await User.findByIdAndUpdate(
      user?._id,
      {
        $addToSet: { favorites: payload.postId },
      },
      { new: true }
    );
    return {
      result,
      message: 'Added to bookmark successfully!',
    };
  }
};

const deletePostFromDB = async (id: string) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }
  const result = await Post.findByIdAndDelete(id, { new: true });
  await User.findByIdAndUpdate(
    post.user,
    {
      $pull: { posts: id },
    },
    { new: true }
  );
  return result;
};

export const postService = {
  createPostToDB,
  getUserPostFromDB,
  updateVote,
  deletePostFromDB,
  bookmarkFavoritePost,
  getAllPostFromDB,
  getSinglePostFromDB,
  getSingleUserPostsFromDB,
};
