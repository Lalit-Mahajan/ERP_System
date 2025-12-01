import db from "../config/db.js";

export const getTrainings = (req, res) => {
    const sql = `
     select
     \`trainingID (PK)\` AS trainingID,
     \`trainingName\` AS trainingName,
     \`trainingHours\` AS trainingHours,
     \`Training Type\` AS trainingType,
     \`TrainingIncharge(UserID as FK)\` AS trainingIncharge,
     \`Learners Attended\` AS learnersAttended
     FROM trainings
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching trainings:", err);
            return res.status(500).json({ error: "Database fetch error" });
        }
        res.json(results);
    });
};

export const addTraining = (req, res) => {
    const {
        trainingID,
        trainingName,
        trainingHours,
        trainingType,
        trainingIncharge,
        learnersAttended
    } = req.body;

    const sql = `
    insert into trainings (\`trainingID (PK)\`,\`trainingName\`,\`trainingHours\`,\`Training Type\`,\`TrainingIncharge(UserID as FK)\`,\`Learners Attended\`)
    values (?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [trainingID, trainingName, trainingHours, trainingType, trainingIncharge, learnersAttended],
        (err) => {
            if (err) {
                console.error("Error adding training:", err);
                return res.status(500).json({ error: "Insert Failed" });
            }
            res.json({ message: "Training added Successfully" })
        }
    );
};

export const updateTraining = (req, res) => {
    const { id } = req.params;
    const {
        trainingName,
        trainingHours,
        trainingType,
        trainingIncharge,
        learnersAttended
    } = req.body;

    const sql = `
    Update trainings
    set
    \`trainingName\`=?,
     \`trainingHours\`=?,
      \`Training Type\`=?,
       \`TrainingIncharge(UserID as FK)\`=?,
        \`Learners Attended\`=?
        where \`trainingID (PK)\`=?
    `;

    db.query(
        sql,
        [trainingName, trainingHours, trainingType, trainingIncharge, learnersAttended],
        (err) => {
            if (err) {
                console.error("Error updating training:", err);
                return res.status(500).json({ error: "Update failed" });
            }
            res.json({ message: "Training updated successfully" });
        }
    );
};

export const deleteTraining = (req, res) => {
    const { id } = req.params;
    const sql = "Delete from trainings where `trainingID (PK)`=?";
    db.query(sql, [id], (err) => {
        if (err) {
            console.error("Error deleting training:", err);
            return res.status(500).json({ error: "delete failed" });
        }
        res.json({ message: "Training deleted successfully" });
    });
};