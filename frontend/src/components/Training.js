import { useState, useEffect } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Training() {
    const [trainings, setTrainings] = useState([]);
    const [form, setForm] = useState({
        trainingID: "",
        trainingName: "",
        trainingHours: "",
        trainingType: "",
        trainingIncharge: "",
        learnersAttended: "",
    });
    const [editID, setEditID] = useState(null);

    const fetchTrainings = async () => {
        try {
            const res = await axios.get(`${API}/training`);
            setTrainings(res.data);
        } catch (error) {
            console.error("Error fetching trainings:", error);
        }
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    const handleSubmit = async () => {
        if (!form.trainingName || !form.trainingType) {
            alert("Please fill all required fields");
            return;
        }

        const payload = { ...form };

        try {
            if (editID) {
                await axios.put(`${API}/training/${editID}`, payload);
                setEditID(null);
            } else {
                await axios.post(`${API}/training/add`, payload);
            }

            setForm({
                trainingID: "",
                trainingName: "",
                trainingHours: "",
                trainingType: "",
                trainingIncharge: "",
                learnersAttended: "",
            });

            fetchTrainings();
        } catch (error) {
            console.error("Error saving training:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/training/${id}`);
            fetchTrainings();
        } catch (error) {
            console.error("Error deleting training:", error);
        }
    };

    const handleEdit = (t) => {
        setEditID(t.trainingID);
        setForm({
            trainingID: t.trainingID,
            trainingName: t.trainingName,
            trainingHours: t.trainingHours,
            trainingType: t.trainingType,
            trainingIncharge: t.trainingIncharge,
            learnersAttended: t.learnersAttended,
        });
    };

    return (
        <div className="container mt-4">

            {/* ✅ HEADER Renewal.js*/}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-4" style={{ color: "#0958a7ff", fontWeight: 600 }}>Training Management</h2>

                {/* ✅ Renewal.js  BACK button */}
                {/*<Link to="/home" className="btn btn-dark">
                    Back
                </Link>*/}
            </div>

            {/* ✅ FORM CARD Renewal.js */}
            <div className="card p-4 shadow-sm mb-4">
                <div className="row g-3">

                    {/* ✅ Same style input fields */}
                    <div className="col-md">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Training ID"
                            value={form.trainingID}
                            onChange={(e) => setForm({ ...form, trainingID: e.target.value })}
                        />
                    </div>

                    <div className="col-md">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Training Name"
                            value={form.trainingName}
                            onChange={(e) => setForm({ ...form, trainingName: e.target.value })}
                        />
                    </div>

                    <div className="col-md">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Training Hours"
                            value={form.trainingHours}
                            onChange={(e) => setForm({ ...form, trainingHours: e.target.value })}
                        />
                    </div>

                    <div className="col-md">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Training Type"
                            value={form.trainingType}
                            onChange={(e) => setForm({ ...form, trainingType: e.target.value })}
                        />
                    </div>

                    <div className="col-md">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Training Incharge"
                            value={form.trainingIncharge}
                            onChange={(e) =>
                                setForm({ ...form, trainingIncharge: e.target.value })
                            }
                        />
                    </div>

                    <div className="col-md">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Learners Attended"
                            value={form.learnersAttended}
                            onChange={(e) =>
                                setForm({ ...form, learnersAttended: e.target.value })
                            }
                        />
                    </div>

                    <div className="col-md-auto">
                        <button className="btn btn-primary px-4" onClick={handleSubmit}>
                            {editID ? "Update" : "Add"}
                        </button>
                    </div>
                </div>
            </div>

            {/* ✅ TABLE Renewal.js */}
            <div className="card shadow-sm">
                <table className="table table-striped table-bordered mb-0 text-center">
                    <thead className="table-primary fw-bold">
                        <tr>
                            <th>Training ID</th>
                            <th>Name</th>
                            <th>Hours</th>
                            <th>Type</th>
                            <th>Incharge</th>
                            <th>Learners</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {trainings.length ? (
                            trainings.map((t) => (
                                <tr key={t.trainingID}>
                                    <td>{t.trainingID}</td>
                                    <td>{t.trainingName}</td>
                                    <td>{t.trainingHours}</td>
                                    <td>{t.trainingType}</td>
                                    <td>{t.trainingIncharge}</td>
                                    <td>{t.learnersAttended}</td>

                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => handleEdit(t)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(t.trainingID)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
