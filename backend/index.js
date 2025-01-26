import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./DB/db.js";
import path from "path";
import userRoute from "./routes/user.route.js";
import loanRoute from "./routes/loan.route.js";
import adminRoute from "./routes/admin.route.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["content-type", "multipart/form-data"],
};
const app = express();

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// backend routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/loans", loanRoute);
app.use("/api/v1/admin", adminRoute);

// frontend routes
app.use(express.static(path.join(__dirname, "frontend/dist")));
app.get("*", (req, res) => {
  return res.sendFile(
    path.resolve(__dirname, "frontend", "dist", "index.html")
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
