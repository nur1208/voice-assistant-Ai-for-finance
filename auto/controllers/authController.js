import { promisify } from "util";
// import crypto from "crypto";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token;

  // 1 getting token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).send({
      status: "fall",
      message:
        "you are not logged in! Please log in to get access",
    });
  }
  // 2 verification token
  const decode = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3 check if user still exists
  const currentUser = await User.findById(decode.id);
  // if the user deleted after we send him a token
  // and before the token expired
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist",
        401,
        "TokenExpiredError"
      )
    );
  }

  // grant access to protected route
  req.user = currentUser;
  next();
};
