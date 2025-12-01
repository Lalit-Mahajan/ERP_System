// // backend/config/db.js
// import mysql from "mysql2";
// import dotenv from "dotenv";
// dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// // Test Connection
// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error("❌ MySQL Connection Failed:", err);
//   } else {
//     console.log("✅ MySQL Connected:", process.env.DB_NAME);
//     connection.release();
//   }
// });

// export default pool.promise();     // ⬅️ सबसे IMPORTANT



// backend/config/db.js
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Connection Failed:", err);
  } else {
    console.log("Connected to MySQL Database:", process.env.DB_NAME);
  }
});

export default db;