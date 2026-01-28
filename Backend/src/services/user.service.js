import { getAllUsersDB, findUserById } from "../models/user.model.js";

export const getAllUsersService = async () => {
  return await getAllUsersDB();
};

export const getUserByIdService = async (id) => {
  return await findUserById(id);
};
