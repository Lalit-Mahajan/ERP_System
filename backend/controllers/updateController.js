import db from "../config/db.js";

export const updateTeamsFromCSV = async (req, res) => {
    const rows = req.body.rows;

    let successRows = [];
    let failedRows = [];

    for (const row of rows) {
        const {
            teamId,
            productId,
            productName,
            teamName,
            userId,
            fullname,
            teamManager,
            roleId,
            ratings
        } = row;

        try {
            if (!teamId || !userId) {
                failedRows.push({ ...row, reason: "Missing teamId or userId" });
                continue;
            }

            // 🔵 1) Check existing row
            const [existing] = await db.promise().query(
                "SELECT * FROM teams WHERE teamId=? AND userId=?",
                [teamId, userId]
            );

            // 🟢 2) INSERT new row
            if (existing.length === 0) {
                await db.promise().query(
                    `INSERT INTO teams 
                    (teamId, productId, productName, teamName, userId, fullname, teamManager, roleId, ratings)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        teamId, productId, productName, teamName,
                        userId, fullname, teamManager, roleId, ratings
                    ]
                );

                successRows.push({ ...row, action: "Inserted Successfully" });
                continue;
            }

            const dbRow = existing[0];

            // 🟡 3) Check changes
            const changed =
                dbRow.productId !== productId ||
                dbRow.productName !== productName ||
                dbRow.teamName !== teamName ||
                dbRow.fullname !== fullname ||
                dbRow.teamManager !== teamManager ||
                dbRow.roleId !== roleId ||
                String(dbRow.ratings) !== String(ratings);

            // 🟡 Updated row
            if (changed) {
                await db.promise().query(
                    `UPDATE teams SET productId=?, productName=?, teamName=?, fullname=?,
                    teamManager=?, roleId=?, ratings=? WHERE teamId=? AND userId=?`,
                    [
                        productId, productName, teamName, fullname,
                        teamManager, roleId, ratings,
                        teamId, userId
                    ]
                );

                successRows.push({ ...row, action: "Updated Successfully" });
            } else {
                successRows.push({ ...row, action: "No Change" });
            }

        } catch (err) {
            failedRows.push({ ...row, reason: err.message });
        }
    }

    return res.json({
        successCount: successRows.length,
        failCount: failedRows.length,
        successRows,
        failedRows
    });
};


// import db from "../config/db.js";

// export const updateTeamsFromCSV = async (req, res) => {
//     const rows = req.body.rows;

//     let successRows = [];
//     let failedRows = [];

//     for (const row of rows) {
//         const {
//             teamId,
//             productId,
//             productName,
//             teamName,
//             userId,
//             fullname,
//             teamManager,
//             roleId,
//             ratings
//         } = row;

//         try {
//             // 1️⃣ Find the row in MySQL
//             const [existing] = await db.promise().query(
//                 "SELECT * FROM teams WHERE teamId = ? AND userId = ?",
//                 [teamId, userId]
//             );

//             // 2️⃣ Row NOT found → INSERT new row
//             if (existing.length === 0) {
//                 const insertSQL = `
//                     INSERT INTO teams (
//                         teamId, productId, productName, teamName,
//                         userId, fullname, teamManager, roleId, ratings
//                     )
//                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//                 `;

//                 await db.promise().query(insertSQL, [
//                     teamId, productId, productName, teamName,
//                     userId, fullname, teamManager, roleId, ratings
//                 ]);

//                 successRows.push({ ...row, action: "inserted" });
//                 continue;
//             }

//             // 3️⃣ Found existing row → check if data changed
//             const dbRow = existing[0];

//             const changed =
//                 dbRow.productId !== productId ||
//                 dbRow.productName !== productName ||
//                 dbRow.teamName !== teamName ||
//                 dbRow.fullname !== fullname ||
//                 dbRow.teamManager !== teamManager ||
//                 dbRow.roleId !== roleId ||
//                 String(dbRow.ratings) !== String(ratings);

//             // 4️⃣ If changed → UPDATE
//             if (changed) {
//                 const updateSQL = `
//                     UPDATE teams SET
//                         productId=?, productName=?, teamName=?, fullname=?,
//                         teamManager=?, roleId=?, ratings=?
//                     WHERE teamId=? AND userId=?
//                 `;

//                 await db.promise().query(updateSQL, [
//                     productId, productName, teamName, fullname,
//                     teamManager, roleId, ratings,
//                     teamId, userId
//                 ]);

//                 successRows.push({
//                     ...row,
//                     action: "updated"
//                 });
//             } else {
//                 // Data is same → OK
//                 successRows.push({
//                     ...row,
//                     action: "no change"
//                 });
//             }

//         } catch (err) {
//             failedRows.push({
//                 ...row,
//                 reason: err.message
//             });
//         }
//     }

//     return res.json({
//         successCount: successRows.length,
//         failCount: failedRows.length,
//         successRows,
//         failedRows
//     });
// };


