const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing auth header" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token" });

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret

    // Ensure the decoded token contains user data (in your case from user_metadata)
    if (!decoded || !decoded.user_metadata) {
      return res.status(401).json({ error: "Invalid token, missing user information" });
    }

    // Assign the necessary user information to req.user
    req.user = {
      id: decoded.sub, // 'sub' is the user identifier in the JWT
      email: decoded.email, // You can include other user details if necessary
      // Add any other fields you need
    };

    req.token = token; // Add the token to the request object for future use (e.g., Supabase client)
    
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
