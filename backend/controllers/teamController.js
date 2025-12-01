import db from "../config/db.js";

// Get all teams
export const getTeam = (req, res) => {
    const sql = `
     SELECT
       teamId,
       productId,
       productName,
       teamName,
       userId,
       fullname,
       teamManager,
       roleId,
       ratings
     FROM teams
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching team:", err);
            return res.status(500).json({ error: "Database fetch error" });
        }
        res.json(results);
    });
};

// Add team
export const addTeam = (req, res) => {
    const {
        teamId,
        productId,
        productName,
        teamName,
        userId,
        fullname,
        teamManager,
        roleId,
        ratings,
    } = req.body;

    const sql = `
        INSERT INTO teams (
           teamId,
           productId,
           productName,
           teamName,
           userId,
           fullname,
           teamManager,
           roleId,
           ratings
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [teamId, productId, productName, teamName, userId, fullname, teamManager, roleId, ratings],
        (err) => {
            if (err) {
                console.error("Error adding team:", err);
                return res.status(500).json({ error: "Insert Failed" });
            }
            res.json({ message: "Team added Successfully" });
        }
    );
};

// Update team
export const updateTeam = (req, res) => {
    const { id } = req.params;
    const {
        productId,
        productName,
        teamName,
        userId,
        fullname,
        teamManager,
        roleId,
        ratings,
    } = req.body;

    const sql = `
        UPDATE teams
        SET
          productId=?,
          productName=?,
          teamName=?,
          userId=?,
          fullname=?,
          teamManager=?,
          roleId=?,
          ratings=?
        WHERE teamId=?
    `;

    db.query(
        sql,
        [productId, productName, teamName, userId, fullname, teamManager, roleId, ratings, id],
        (err) => {
            if (err) {
                console.error("Error updating team:", err);
                return res.status(500).json({ error: "Update failed" });
            }
            res.json({ message: "Team updated successfully" });
        }
    );
};

// Delete team
export const deleteTeam = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM teams WHERE teamId=?";

    db.query(sql, [id], (err) => {
        if (err) {
            console.error("Error deleting team:", err);
            return res.status(500).json({ error: "delete failed" });
        }
        res.json({ message: "Team deleted successfully" });
    });
};
