import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields.",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      fullName,
    });

    const tokenData = {
      userId: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(201)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
      .json({
        message: "User registered successfully.",
        user: newUser,
      });
  } catch (error) {
    console.log(error.message);
    return res.status(501).json({
      message: `Server error: ${error.message}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields.",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "no user found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
      email: user.email,
      fullName: user.fullName,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
      .json({
        message: `Welcome ${user.fullName}`,
        success: true,
        user
      });
  } catch (error) {
    console.log(error.message);
    return res.status(501).json({
      message: `Server error: ${error.message}`,
    });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (error) {
    console.log(error.messsage);
    return res.status(501).json({
      message: `Server error: ${error.message}`,
      success: false,
    });
  }
};

export { register, login, logout };
