import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  try {
    // Проверяем наличие заголовка Authorization
    const authHeader = req.headers.authorization;
    console.log("TOKEN", authHeader);
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }
    // Извлекаем токен из заголовка
    const token = authHeader.split(" ")[1]
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    const secretKey = process.env.JWT_PAS || "default_secret_key";
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token has expired" });
        } else if (err.name === "JsonWebTokenError") {
          return res.status(401).json({ message: "Invalid token" });
        } else {
          return res.status(401).json({ message: "Token verification failed" });
        }
      }

      req.userId = decoded._id;
      next();
    });
  } catch (error) {
    console.error("Authorization error:", error.message);
    res.status(500).json({ message: "Authorization error occurred" });
  }
}
