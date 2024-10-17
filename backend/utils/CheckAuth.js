import jwt from "jsonwebtoken";
export default (req, res, next) => {
  try {
    const token = req.headers.authorization || "";
    const JWT_PAS = process.env.JWT_PAS;
    if (token) {
      const decaded = jwt.verify(token, JWT_PAS);
      req.userId = decaded._id;
      next();
    } else {
      return res.status(403).json({
        message: "No access",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "No access",
    });
  }
};
