import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { IGardenJournal } from './gardenJournal.interface';
import { GardenJournal } from './gardenJournal.model';
import { JwtPayload } from 'jsonwebtoken';

const createGardenJournal = async (payload: IGardenJournal) => {
  const isUserExist = await User.findById(payload.user);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  const result = await GardenJournal.create(payload);
  return result;
};

const getAllGardenJournal = async () => {
  const result = await GardenJournal.find({ isPublic: true }).populate('user');
  return result;
};
const getMyAllGardenJournal = async (user: JwtPayload) => {
  const result = await GardenJournal.find({ user: user?._id }).populate('user');
  return result;
};

const getSingleGardenJournal = async (id: string) => {
  const result = await GardenJournal.findById(id).populate('user');
  return result;
};
const deleteGardenJournal = async (id: string) => {
  const result = await GardenJournal.findByIdAndDelete(id);
  return result;
};
const updateGardenJournal = async (
  id: string,
  payload: Partial<IGardenJournal>
) => {
  const isExistGardenJournal = await GardenJournal.findById(id);
  if (!isExistGardenJournal) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This garden journal is not found!'
    );
  }
  const result = await GardenJournal.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const gardenJournalService = {
  createGardenJournal,
  getAllGardenJournal,
  getMyAllGardenJournal,
  deleteGardenJournal,
  updateGardenJournal,
  getSingleGardenJournal,
};
