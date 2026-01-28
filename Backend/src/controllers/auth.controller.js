import jwt from "jsonwebtoken";
import { registerService, loginService } from "../services/auth.service.js";

export const register = async (req, res) => {
  const user = await registerService(req.body);
  res.status(201).json(user);
};

export const login = async (req, res) => {
  try {
    const { accessToken, refreshToken } = await loginService(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
    });

    res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({
      message: err.message || "Invalid credentials",
    });
  }
};


export const refresh = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const accessToken = jwt.sign(
    { id: payload.id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  res.json({ accessToken });
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.sendStatus(204);
};
