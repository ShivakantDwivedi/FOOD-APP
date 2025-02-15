import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ status: 401, message: "Token is missing", data: null });
  } else {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET);
      req.auth = decoded.id;
      return next();
    } catch (error) {
      next(error);
    }
  }
};

export default authorize;
