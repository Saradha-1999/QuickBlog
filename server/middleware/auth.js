// middleware/auth.js
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if header exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: "Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Save user info to request
    next();
  } catch (error) {
    console.error("❌ JWT Verification Error:", error.message);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

export default auth;


// import jwt from 'jsonwebtoken';

// const auth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   // Add these logs for debugging
//   console.log("🧪 Received token:", token);
//   console.log("🧪 JWT_SECRET in use:", process.env.JWT_SECRET);

//   try {
//     jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch (error) {
//     console.error("❌ JWT Verification Error:", error.message);
//     res.json({ success: false, message: "Invalid token" });
//   }
// };

// export default auth;






// import jwt from 'jsonwebtoken';

// const auth =(req, res, next)=>{
//     const token = req.headers.authorization;

//     try {
//         jwt.verify(token, process.env.JWT_SECRET)
//         next();
//     } catch (error) {
//         res.json({success: false, message: "Invalid token"});
//     }
// }

// export default auth;