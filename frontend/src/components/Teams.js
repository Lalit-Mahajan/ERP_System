import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Teams() {
    const [teams, setTeams] = useState([]);
    const [form, setForm] = useState({
        teamID: "",
        productID: "",
        productName: "",
        teamName: "",
        userID: "",
        fullname: "",
        teamManager: "",
        roleID: "",
        ratings: "",
    });
    const [editID, setEditID] = useState(null);

    const fetchTeams = async () => {
        try {
            const res = await axios.get(`${API}/teams`);
            setTeams(res.data);
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleSubmit = async () => {
        if (!form.teamName || !form.productID) {
            alert("Please fill all required fields");
            return;
        }

        const payload = {
            teamId: form.teamID,
            productId: form.productID,
            productName: form.productName,
            teamName: form.teamName,
            userId: form.userID,
            fullname: form.fullname,
            teamManager: form.teamManager,
            roleId: form.roleID,
            ratings: form.ratings,
        };

        try {
            if (editID) {
                await axios.put(`${API}/teams/${editID}`, payload);
                setEditID(null);
            } else {
                await axios.post(`${API}/teams/add`, payload);
            }

            setForm({
                teamID: "",
                productID: "",
                productName: "",
                teamName: "",
                userID: "",
                fullname: "",
                teamManager: "",
                roleID: "",
                ratings: "",
            });

            fetchTeams();
        } catch (error) {
            console.error("Error saving team:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/teams/${id}`);
            fetchTeams();
        } catch (error) {
            console.error("Error deleting team:", error);
        }
    };

    const handleEdit = (t) => {
        setEditID(t.teamId);
        setForm({
            teamID: t.teamId,
            productID: t.productId,
            productName: t.productName,
            teamName: t.teamName,
            userID: t.userId,
            fullname: t.fullname,
            teamManager: t.teamManager,
            roleID: t.roleId,
            ratings: t.ratings,
        });
    };

    return (
        <div className="container mt-4">
            {/* HEADER */}
            {/* HEADER WITH TABS */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link to="/products" className="nav-link" style={{ fontSize: '1.5rem', color: '#0b1e47', fontWeight: '600' }}>
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link active" style={{ fontSize: '1.5rem', color: "#0958a7ff", fontWeight: '600' }}>
                                Teams
                            </button>
                        </li>
                    </ul>
                </div>

                {/* <Link to="/home" className="btn btn-dark px-4">Back</Link>*/}
            </div>


            {/* FORM */}
            <div className="card p-4 shadow-sm mb-4">
                <div className="row g-3">
                    {[
                        { label: "Team ID", key: "teamID" },
                        { label: "Product ID", key: "productID" },
                        { label: "Product Name", key: "productName" },
                        { label: "Team Name", key: "teamName" },
                        { label: "User ID", key: "userID" },
                        { label: "Full Name", key: "fullname" },
                        { label: "Team Manager", key: "teamManager" },
                        { label: "Role ID", key: "roleID" },
                        { label: "Ratings", key: "ratings" },
                    ].map((input) => (
                        <div className="col-md" key={input.key}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={input.label}
                                value={form[input.key]}
                                onChange={(e) =>
                                    setForm({ ...form, [input.key]: e.target.value })
                                }
                            />
                        </div>
                    ))}

                    <div className="col-md-auto">
                        <button className="btn btn-primary px-4" onClick={handleSubmit}>
                            {editID ? "Update" : "Add"}
                        </button>
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="card shadow-sm">
                <table className="table table-striped table-bordered mb-0 text-center">
                    <thead className="table-primary fw-bold">
                        <tr>
                            <th>Team ID</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Team Name</th>
                            <th>User ID</th>
                            <th>Full Name</th>
                            <th>Team Manager</th>
                            <th>Role ID</th>
                            <th>Ratings</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.length ? (
                            teams.map((t) => (
                                <tr key={t.teamId}>
                                    <td>{t.teamId}</td>
                                    <td>{t.productId}</td>
                                    <td>{t.productName}</td>
                                    <td>{t.teamName}</td>
                                    <td>{t.userId}</td>
                                    <td>{t.fullname}</td>
                                    <td>{t.teamManager}</td>
                                    <td>{t.roleId}</td>
                                    <td>{t.ratings}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => handleEdit(t)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(t.teamId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="10">No records found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
