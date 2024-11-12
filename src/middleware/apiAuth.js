import jwt from "jsonwebtoken";

// Ensure SECRET is available in environment variables
const JWT_SECRET_KEY = process.env.SECRET;


// Authentication Middleware
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present and formatted correctly
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access token missing" });
  }

  const token = authHeader.split(" ")[1];

  // Debugging: Log the token only if needed (avoid this in production)
  console.log("Received Token:", token);

  try {
    // Verify the JWT token with the same secret and algorithm used for signing
    const decoded = jwt.verify(token, JWT_SECRET_KEY, {
      algorithms: ["HS256"],
    });

    // Attach decoded user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }

    // Handle invalid or other errors
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};
