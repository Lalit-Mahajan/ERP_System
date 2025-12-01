import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Products() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        productID: "",
        productName: "",
        productStage: "",
    });
    const [editID, setEditID] = useState(null);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${API}/products`);
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async () => {
        if (!form.productID || !form.productName) {
            alert("Please fill all required fields");
            return;
        }

        const payload = {
            productID: form.productID,
            productName: form.productName,
            productStage: form.productStage,
        };

        try {
            if (editID) {
                await axios.put(`${API}/products/${editID}`, payload);
                setEditID(null);
            } else {
                await axios.post(`${API}/products/add`, payload);
            }

            setForm({
                productID: "",
                productName: "",
                productStage: "",
            });

            fetchProducts();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleEdit = (p) => {
        setEditID(p.productID);
        setForm({
            productID: p.productID,
            productName: p.productName,
            productStage: p.productStage,
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
                            <button className="nav-link active" style={{ fontSize: '1.5rem', color: "#0958a7ff", fontWeight: '600' }}>
                                Products
                            </button>
                        </li>
                        <li className="nav-item">
                            <Link to="/teams" className="nav-link" style={{ fontSize: '1.5rem', color: '#0b1e47', fontWeight: '600' }}>
                                Teams
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* <Link to="/home" className="btn btn-dark px-4">Back</Link>*/}
            </div>


            {/* FORM CARD */}
            <div className="card p-4 shadow-sm mb-4">
                <div className="row g-3">
                    {[
                        { label: "Product ID", key: "productID" },
                        { label: "Product Name", key: "productName" },
                        { label: "Product Stage", key: "productStage" },
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
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Product Stage</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length ? (
                            products.map((p) => (
                                <tr key={p.productID}>
                                    <td>{p.productID}</td>
                                    <td>{p.productName}</td>
                                    <td>{p.productStage}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => handleEdit(p)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(p.productID)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4">No records found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
