import jwt from "jsonwebtoken";
const SECRET = "your_jwt_secret";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;

    if (!req.user.isAdmin)
      return res.status(403).json({ error: "Access denied: Admins only" });

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
