// backend/controllers/renewalController.js
import db from "../config/db.js";

// ✅ GET all renewals
export const getRenewals = (req, res) => {
    const sql = `
    SELECT 
      RenewalID, UserID, fullname, JoiningDate, AmountPaid, RenewalNovember
  FROM renewal
  `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Error fetching renewals:", err);
            return res.status(500).json({ error: "Database fetch error" });
        }
        res.json(results);
    });
};

// ✅ ADD new renewal
export const addRenewal = (req, res) => {
    const { renewalID, userID, fullname, joiningDate, amountPaid, renewalNovember } = req.body;

    const sql = `
    INSERT INTO renewal (\`RenewalID (PK)\`, \`UserID (FK)\`, \`fullname(FK)\`, \`Joining Date\`, \`Amount Paid\`, \`Renewal November\`)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

    db.query(sql, [renewalID, userID, fullname, joiningDate, amountPaid, renewalNovember], (err) => {
        if (err) {
            console.error("❌ Error adding renewal:", err);
            return res.status(500).json({ error: "Insert failed" });
        }
        res.json({ message: "✅ Renewal added successfully" });
    });
};

// ✅ UPDATE renewal
export const updateRenewal = (req, res) => {
    const { id } = req.params;
    const { userID, fullname, joiningDate, amountPaid, renewalNovember } = req.body;

    const sql = `
    UPDATE renewal 
    SET 
      \`UserID (FK)\` = ?, 
      \`fullname(FK)\` = ?, 
      \`Joining Date\` = ?, 
      \`Amount Paid\` = ?, 
      \`Renewal November\` = ?
    WHERE \`RenewalID (PK)\` = ?
  `;

    db.query(sql, [userID, fullname, joiningDate, amountPaid, renewalNovember, id], (err) => {
        if (err) {
            console.error("❌ Error updating renewal:", err);
            return res.status(500).json({ error: "Update failed" });
        }
        res.json({ message: "✅ Renewal updated successfully" });
    });
};

// ✅ DELETE renewal
export const deleteRenewal = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM renewal WHERE `RenewalID (PK)` = ?";
    db.query(sql, [id], (err) => {
        if (err) {
            console.error("Error deleting renewal:", err);
            return res.status(500).json({ error: "Delete failed" });
        }
        res.json({ message: "Renewal deleted successfully" });
    });
};
