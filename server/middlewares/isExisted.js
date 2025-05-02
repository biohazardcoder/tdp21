import jwt from "jsonwebtoken";

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export default function (req, res, next) {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (!token) return sendErrorResponse(res, 409, "Access not allowed!⛔");

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET_KEY);
    req.userInfo = { userId: decoded._id, role: decoded.role };

    next();
  } catch (err) {
    console.log(err);
    return sendErrorResponse(res, 401, "Yaroqsiz token");
  }
}
