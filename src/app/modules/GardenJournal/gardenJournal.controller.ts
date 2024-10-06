import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { gardenJournalService } from './gardenJournal.service';

const createGardenJournal = catchAsync(async (req, res) => {
  const gardenJournal = await gardenJournalService.createGardenJournal(
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Garden journal Created Successfully',
    data: gardenJournal,
  });
});

const getAllGardenJournal = catchAsync(async (req, res) => {
  const gardenJournal = await gardenJournalService.getAllGardenJournal();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Garden journal retrieved Successfully',
    data: gardenJournal,
  });
});

const getMyAllGardenJournal = catchAsync(async (req, res) => {
  const gardenJournal = await gardenJournalService.getMyAllGardenJournal(
    req.user
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Garden journals retrieved Successfullyyyyyyyyyyyy',
    data: gardenJournal,
  });
});

const getSingleGardenJournal = catchAsync(async (req, res) => {
  const { gardenId } = req.params;
  const gardenJournal = await gardenJournalService.getSingleGardenJournal(
    gardenId
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Garden journal retrieved Successfully',
    data: gardenJournal,
  });
});

const updateSingleGardenJournal = catchAsync(async (req, res) => {
  const { gardenId } = req.params;
  const gardenJournal = await gardenJournalService.updateGardenJournal(
    gardenId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Garden journal updated Successfully',
    data: gardenJournal,
  });
});

const deleteSingleGardenJournal = catchAsync(async (req, res) => {
  const { gardenId } = req.params;
  const gardenJournal = await gardenJournalService.deleteGardenJournal(
    gardenId
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Garden journal is deleted Successfully',
    data: gardenJournal,
  });
});

export const gardenJournalController = {
  createGardenJournal,
  getAllGardenJournal,
  getMyAllGardenJournal,
  getSingleGardenJournal,
  updateSingleGardenJournal,
  deleteSingleGardenJournal,
};
