import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use(express.static(path.join(__dirname, "../../Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../Frontend/dist/index.html")
  );
});


export default app;
