import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/user.model.js";

const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });

const createRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerService = async (data) => {
  const exists = await findUserByEmail(data.email);
  if (exists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await createUser({
    ...data,
    password: hashedPassword,
  });
};

export const loginService = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return {
    accessToken: createAccessToken({ id: user.id }),
    refreshToken: createRefreshToken({ id: user.id }),
  };
};
