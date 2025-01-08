import { IUserRelationship } from './userRelationship.interface';
import { UserRelationship } from './userRelationship.model';
import { TUser } from '../User/user.interface';

const createRelationShip = async (user: TUser, payload: IUserRelationship) => {
  payload.userId = user?._id;
  const result = await UserRelationship.create(payload);
  return result;
};

export const relationShipService = {
  createRelationShip,
};
