// backend/controllers/authController.js

export const loginUser = (req, res) => {
    const { username, password } = req.body;

    // 🔒 Hardcoded login credentials
    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "admin";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
};


// // backend/controllers/authController.js
// import db from "../config/db.js";

// export const loginUser = (req, res) => {
//     const { username, password } = req.body;

//     const query = "SELECT * FROM users WHERE username = ? AND password = ?";
//     db.query(query, [username, password], (err, result) => {
//         if (err) {
//             console.error("Login Error:", err);
//             return res.status(500).json({ error: err });
//         }

//         if (result.length > 0) {
//             return res.json({ success: true, message: "Login successful" });
//         } else {
//             return res.status(401).json({ success: false, message: "Invalid credentials" });
//         }
//     });
// };
