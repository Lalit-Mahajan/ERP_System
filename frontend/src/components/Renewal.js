import { useState, useEffect } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Renewal() {
    const [renewals, setRenewals] = useState([]);
    const [form, setForm] = useState({
        renewalID: "",
        UserID: "",
        fullname: "",
        joiningDate: "",
        amountPaid: "",
        renewalNovember: "",
    });
    const [editID, setEditID] = useState(null);

    const fetchRenewals = async () => {
        try {
            const res = await axios.get(`${API}/renewal`);
            setRenewals(res.data);
        } catch (error) {
            console.error("Error fetching renewals:", error);
        }
    };

    useEffect(() => {
        fetchRenewals();
    }, []);

    const handleSubmit = async () => {
        if (!form.UserID || !form.fullname) {
            alert("Please fill all required fields");
            return;
        }

        const payload = {
            renewalID: form.renewalID,
            userID: form.UserID,
            fullname: form.fullname,
            joiningDate: form.joiningDate,
            amountPaid: form.amountPaid,
            renewalNovember: form.renewalNovember,
        };

        try {
            if (editID) {
                await axios.put(`${API}/renewal/${editID}`, payload);
                setEditID(null);
            } else {
                await axios.post(`${API}/renewal/add`, payload);
            }
            setForm({
                renewalID: "",
                UserID: "",
                fullname: "",
                joiningDate: "",
                amountPaid: "",
                renewalNovember: "",
            });
            fetchRenewals();
        } catch (error) {
            console.error("Error saving renewal:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/renewal/${id}`);
            fetchRenewals();
        } catch (error) {
            console.error("Error deleting renewal:", error);
        }
    };

    const handleEdit = (r) => {
        setEditID(r.RenewalID);
        setForm({
            renewalID: r.RenewalID,
            UserID: r.UserID,
            fullname: r.fullname,
            joiningDate: r["JoiningDate"],
            amountPaid: r["AmountPaid"],
            renewalNovember: r["RenewalNovember"] || "",
        });
    };

    return (
        <div className="container mt-4">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-4" style={{ color: "#0958a7ff", fontWeight: 600 }}>Renewal Management</h2>
                {/*<Link to="/home" className="btn btn-dark">
                    Back
                </Link>*/}
            </div>

            {/* FORM CARD */}
            <div className="card p-4 shadow-sm mb-4">
                <div className="row g-3">
                    <div className="col-md">
                        <input type="text" className="form-control" placeholder="Renewal ID"
                            value={form.renewalID}
                            onChange={(e) => setForm({ ...form, renewalID: e.target.value })} />
                    </div>
                    <div className="col-md">
                        <input type="text" className="form-control" placeholder="User ID"
                            value={form.UserID}
                            onChange={(e) => setForm({ ...form, UserID: e.target.value })} />
                    </div>
                    <div className="col-md">
                        <input type="text" className="form-control" placeholder="Full Name"
                            value={form.fullname}
                            onChange={(e) => setForm({ ...form, fullname: e.target.value })} />
                    </div>
                    <div className="col-md">
                        <input type="text" className="form-control" placeholder="Joining Date"
                            value={form.joiningDate}
                            onChange={(e) => setForm({ ...form, joiningDate: e.target.value })} />
                    </div>
                    <div className="col-md">
                        <input type="text" className="form-control" placeholder="Amount Paid"
                            value={form.amountPaid}
                            onChange={(e) => setForm({ ...form, amountPaid: e.target.value })} />
                    </div>
                    <div className="col-md">
                        <input type="text" className="form-control" placeholder="Renewal November"
                            value={form.renewalNovember}
                            onChange={(e) => setForm({ ...form, renewalNovember: e.target.value })} />
                    </div>

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
                            <th>RenewalID</th>
                            <th>UserID</th>
                            <th>fullname</th>
                            <th>Joining Date</th>
                            <th>Amount Paid</th>
                            <th>Renewal November</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renewals.length ? (
                            renewals.map((r) => (
                                <tr key={r.RenewalID}>
                                    <td>{r.RenewalID}</td>
                                    <td>{r.UserID}</td>
                                    <td>{r.fullname}</td>
                                    <td>{r["JoiningDate"]}</td>
                                    <td>{r["AmountPaid"]}</td>
                                    <td>{r["RenewalNovember"]}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => handleEdit(r)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(r.RenewalID)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="7">No records found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
