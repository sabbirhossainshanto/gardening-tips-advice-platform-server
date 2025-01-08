import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { NewsFeed } from './newsFeed.model';
import { INewsFeed } from './newsFeed.interface';
import { fileUploader } from '../../utils/fileUploader';
import { Express } from 'express';
import { TUser } from '../User/user.interface';

const addNewsFeed = async (
  user: TUser,
  file: Express.Multer.File,
  payload: INewsFeed
) => {
  if (file) {
    const { secure_url } = await fileUploader.uploadToCloudinary(file);
    payload.photo = secure_url;
  }
  payload.user = user?._id;
  const result = await NewsFeed.create(payload);
  return result;
};

const getAllNewsFeed = async () => {
  const result = await NewsFeed.find().populate('user');
  return result;
};

const getSingleNewsFeed = async (id: string) => {
  const result = await NewsFeed.findById(id).populate('user');

  return result;
};

const editNewsFeed = async (id: string, payload: Partial<INewsFeed>) => {
  const isUserExist = await User.findById(payload.user);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not exist');
  }

  const isNewsFeedExist = await NewsFeed.findById(id);
  if (!isNewsFeedExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This newsFeed is not exist');
  }

  const result = await NewsFeed.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('user');

  return result;
};

const deleteNewsFeed = async (id: string) => {
  return await NewsFeed.findByIdAndDelete(id, {
    new: true,
    runValidators: true,
  });
};

export const newsFeedService = {
  addNewsFeed,
  getAllNewsFeed,
  editNewsFeed,
  getSingleNewsFeed,
  deleteNewsFeed,
};
