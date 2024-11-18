const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];

    // Check if the Authorization header is missing
    if (!authorizationHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
        success: false,
      });
    }

    // Extract token from the header
    const token = authorizationHeader.split(" ")[1];  // 'Bearer <token>'

    // If token is missing or malformed
    if (!token || token.trim() === "") {
      return res.status(401).json({
        message: "Token missing or malformed",
        success: false,
      });
    }

    // Ensure JWT_SECRET exists in environment
    if (!process.env.JWT_KEY) {
      return res.status(500).json({
        message: "Internal server error: Missing JWT_KEY",
        success: false,
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Token is not valid or has expired",
          success: false,
        });
      }

      // Attach the userId to the request
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    // Log and handle internal errors
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
