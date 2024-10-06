/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { IUpdateVote, TPost } from './post.interface';
import { Post } from './post.model';
import { ObjectId } from 'mongodb';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../../utils/verifyJWT';
import config from '../../config';

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

const getAllPostFromDB = async (
  token: string | undefined,
  queryParams: Record<string, unknown>
) => {
  const { searchTerm, sort = '-createdAt' } = queryParams;

  const pipeline: any[] = [];

  if (token) {
    const decoded = verifyToken(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { email } = decoded;
    const isUserExist = await User.findOne({ email: email });

    if (
      isUserExist &&
      !isUserExist?.isVerified &&
      !isUserExist?.premiumStatus &&
      isUserExist?.role === 'USER'
    ) {
      pipeline.push({
        $match: {
          isPremium: false,
        },
      });
    }
  } else {
    pipeline.push({
      $match: {
        isPremium: false,
      },
    });
  }

  // Search by title or description or category
  if (searchTerm) {
    const regex = new RegExp(searchTerm as string, 'i'); // case-insensitive search
    pipeline.push({
      $match: {
        $or: [{ title: regex }, { description: regex }, { category: regex }],
      },
    });
  }

  // Sorting based on the query parameter
  if (sort === 'upvotes') {
    pipeline.push({
      $addFields: {
        upvoteCount: { $size: '$upvotes' }, // Calculate the number of upvotes
      },
    });
    pipeline.push({
      $sort: { upvoteCount: -1 }, // Sort by upvote count in descending order
    });
  } else if (sort === 'downvotes') {
    pipeline.push({
      $addFields: {
        downvoteCount: { $size: '$downvotes' }, // Calculate the number of upvotes
      },
    });
    pipeline.push({
      $sort: { downvoteCount: -1 }, // Sort by upvote count in descending order
    });
  } else {
    pipeline.push({
      $sort: { createdAt: -1 }, // Default sorting by creation date
    });
  }

  // const limit: number = Number(queryParams?.limit || 10);
  // let skip: number = 0;

  // const page: number = Number(queryParams?.page || 1);
  // skip = Number((page - 1) * limit);
  // pipeline.push({
  //   $skip: Number(skip),
  // });

  // pipeline.push({
  //   $limit: Number(limit),
  // });

  const posts = await Post.aggregate(pipeline).exec();
  const populatedPosts = await Post.populate(posts, [
    { path: 'user', populate: ['followers', 'following', 'posts'] },
    { path: 'upvotes' },
    { path: 'downvotes' },
  ]);

  return populatedPosts;
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

const getUpvotersForMyPosts = async (user: JwtPayload) => {
  const isUserExist = await User.findById(user?._id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  const posts = await Post.find({ user: user?._id }).populate('upvotes');

  if (!posts) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user have no post');
  }
  const upvoters: any = [];
  posts.forEach((post) => {
    post.upvotes.forEach((upvote) => {
      upvoters.push(upvote);
    });
  });
  return upvoters;
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

const updatePostInToDD = async (id: string, payload: Partial<TPost>) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }
  console.log(payload);
  const result = await Post.findByIdAndUpdate(id, payload, { new: true });
  console.log(result);

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
  getUpvotersForMyPosts,
  updatePostInToDD,
};
