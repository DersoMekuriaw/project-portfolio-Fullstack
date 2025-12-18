const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT token
 * Adds `req.user` containing { id, role } if valid
 */
const verifyToken = (req, res, next) => {
  try {
    // Get token from Authorization header (format: "Bearer <token>")
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // split "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");

    // Attach decoded user info to request
    req.user = decoded; // e.g., { id, role }
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = {verifyToken};
