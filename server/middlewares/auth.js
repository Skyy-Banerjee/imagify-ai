import jwt from "jsonwebtoken";

async function userAuth(req, res, next) {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Login Again!" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.id) {
      req.body.userId = decodedToken.id;
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized. Login Again!" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ success: false, message: error.message });
  }
}

export default userAuth;
