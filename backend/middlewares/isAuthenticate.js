import jwt from "jsonwebtoken";

const isAthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "unAuthorized user",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        message: "invalid token",
        success: false,
      });
    }

    req.id = decode.userId;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(501).json({
      message: `Server error: ${error.message}`,
    });
  }
};

export default isAthenticated;
