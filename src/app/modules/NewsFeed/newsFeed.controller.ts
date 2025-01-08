import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { newsFeedService } from './newsFeed.service';
import { Express } from 'express';

const addNewsFeed = catchAsync(async (req, res) => {
  const result = await newsFeedService.addNewsFeed(
    req.user,
    req.file as Express.Multer.File,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully added news feed',
    data: result,
  });
});

const getAllNewsFeed = catchAsync(async (req, res) => {
  const newsFeed = await newsFeedService.getAllNewsFeed();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'News Feed are retrieved successfully!',
    data: newsFeed,
  });
});

const getSingleNewsFeed = catchAsync(async (req, res) => {
  const { newsFeedId } = req.params;
  const newsFeed = await newsFeedService.getSingleNewsFeed(newsFeedId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'News feed is retrieved successfully!',
    data: newsFeed,
  });
});

const editNewsFeed = catchAsync(async (req, res) => {
  const { newsFeedId } = req.params;
  const newsFeed = await newsFeedService.editNewsFeed(newsFeedId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'News Feed is  updated successfully!',
    data: newsFeed,
  });
});

const deleteNewsFeed = catchAsync(async (req, res) => {
  const { newsFeedId } = req.params;
  const result = await newsFeedService.deleteNewsFeed(newsFeedId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'NewsFeed is  deleted successfully!',
    data: result,
  });
});

export const newsFeedController = {
  addNewsFeed,
  getAllNewsFeed,
  editNewsFeed,
  getSingleNewsFeed,
  deleteNewsFeed,
};
