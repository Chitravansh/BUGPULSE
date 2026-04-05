// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) return res.status(401).json({ error: "No token" });

//   try {
//     const decoded = jwt.verify(token, "secretKey");
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader); // DEBUG

    if (!authHeader) {
      return res.status(401).json({ error: "No token" });
    }

    // 🔥 EXTRACT TOKEN PROPERLY
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const decoded = jwt.verify(token, "secretKey");

    req.user = decoded;

    next();
  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
};