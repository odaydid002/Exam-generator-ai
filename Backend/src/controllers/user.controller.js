import { getAllUsersService, getUserByIdService } from "../services/user.service.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
