import { Link } from "react-router-dom";
//import logo from "../images/LogoNew.png";
import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function Home() {
    const [renewalCount, setRenewalCount] = useState(0);
    const [trainingCount, setTrainingCount] = useState(0);
    const [teamCount, setTeamCount] = useState(0);


    const fetchRenewalCount = async () => {
        try {
            const res = await axios.get(`${API}/renewal`);
            setRenewalCount(res.data.length);    // ✅ count = rows length
        } catch (error) {
            console.error("Error loading renewal count", error);
        }
    };
    const fetchTrainingCount = async () => {
        try {
            const res = await axios.get(`${API}/training`);
            setTrainingCount(res.data.length);
        } catch (error) {
            console.error("Error loading training count", error);
        }
    };

    const fetchTeamCount = async () => {
        try {
            const res = await axios.get(`${API}/teams`);
            setTeamCount(res.data.length);
        } catch (error) {
            console.error("Error loading team count", error);
        }
    };

    useEffect(() => {
        fetchRenewalCount();
        fetchTrainingCount();
        fetchTeamCount();
    }, []);

    return (
        <div className="d-flex">

            {/* MAIN CONTENT */}
            <div className="container mt-5" style={{ marginLeft: "40px" }}>
                <h2 className="mb-4" style={{ color: "#0958a7ff", fontWeight: 600 }}>Home Page</h2>

                <div className="row g-4">
                    {/* CARD 1: Number of Students */}
                    <div className="col-md-4">
                        <div
                            className="card rounded-4 shadow-sm p-4 h-100"
                            style={{ border: "2px solid #002B7F" }}
                        >
                            <div className="d-flex justify-content-between align-items-start">
                                <div
                                    className="text-white d-flex align-items-center justify-content-center rounded-3"
                                    style={{ width: "55px", height: "55px", backgroundColor: "#002B7F" }}
                                >
                                    <i className="bi bi-people fs-3"></i>
                                </div>
                                <div className="text-end">
                                    <h5 className="mb-0" style={{ color: "#6996efff", fontWeight: "normal" }}>
                                        128
                                    </h5>
                                    <small className="text-secondary">Learners</small>
                                </div>
                            </div>
                            <h5 className="fw-semibold mt-3 mb-0">Number of Learners</h5>
                        </div>
                    </div>

                    {/* CARD 2: Trainings */}
                    <div className="col-md-4">
                        <Link to="/training" className="text-decoration-none text-dark">
                            <div
                                className="card rounded-4 shadow-sm p-4 h-100"
                                style={{ border: "2px solid #002B7F" }}
                            >
                                <div className="d-flex justify-content-between align-items-start">
                                    <div
                                        className="text-white d-flex align-items-center justify-content-center rounded-3"
                                        style={{ width: "55px", height: "55px", backgroundColor: "#002B7F" }}
                                    >
                                        <i className="bi bi-mortarboard fs-3"></i>
                                    </div>
                                    <div className="text-end">
                                        <h5 className="mb-0" style={{ color: "#6996efff", fontWeight: "normal" }}>
                                            {trainingCount}
                                        </h5>
                                        <small className="text-secondary">Active Programs</small>
                                    </div>
                                </div>
                                <h5 className="fw-semibold mt-3 mb-0">Trainings</h5>
                            </div>
                        </Link>
                    </div>

                    {/* CARD 3: Teams & Products */}
                    <div className="col-md-4">
                        <Link to="/teams" className="text-decoration-none text-dark">
                            <div
                                className="card rounded-4 shadow-sm p-4 h-100"
                                style={{ border: "2px solid #002B7F" }}
                            >
                                <div className="d-flex justify-content-between align-items-start">
                                    <div
                                        className="text-white d-flex align-items-center justify-content-center rounded-3"
                                        style={{ width: "55px", height: "55px", backgroundColor: "#002B7F" }}
                                    >
                                        <i className="bi bi-folder2 fs-3"></i>
                                    </div>
                                    <div className="text-end">
                                        <h5 className="mb-0" style={{ color: "#6996efff", fontWeight: "normal" }}>
                                            {teamCount}
                                        </h5>
                                        <small className="text-secondary">Teams</small>
                                    </div>
                                </div>
                                <h5 className="fw-semibold mt-3 mb-0">Teams & Products</h5>
                            </div>
                        </Link>
                    </div>

                    {/* CARD 4: Access Full Student List */}
                    <div className="col-md-4">
                        <div
                            className="card rounded-4 shadow-sm p-4 h-100"
                            style={{ border: "2px solid #002B7F" }}
                        >
                            <div className="d-flex justify-content-between align-items-start">
                                <div
                                    className="text-white d-flex align-items-center justify-content-center rounded-3"
                                    style={{ width: "55px", height: "55px", backgroundColor: "#002B7F" }}
                                >
                                    <i className="bi bi-list-ul fs-3"></i>
                                </div>
                                <div className="text-end">
                                    <h5 className="mb-0" style={{ color: "#6996efff", fontWeight: "normal" }}>
                                        View
                                    </h5>
                                    <small className="text-secondary">Complete Directory</small>
                                </div>
                            </div>
                            <h5 className="fw-semibold mt-3 mb-0">Access Full Student List</h5>
                        </div>
                    </div>

                    {/* CARD 5: Renewals */}
                    <div className="col-md-4">
                        <Link to="/renewal" className="text-decoration-none text-dark">
                            <div
                                className="card rounded-4 shadow-sm p-4 h-100"
                                style={{ border: "2px solid #002B7F" }}
                            >
                                <div className="d-flex justify-content-between align-items-start">
                                    <div
                                        className="text-white d-flex align-items-center justify-content-center rounded-3"
                                        style={{ width: "55px", height: "55px", backgroundColor: "#002B7F" }}
                                    >
                                        <i className="bi bi-arrow-repeat fs-3"></i>
                                    </div>
                                    <div className="text-end">
                                        <h5 className="mb-0" style={{ color: "#6996efff", fontWeight: "normal" }}>
                                            {renewalCount}
                                        </h5>
                                        <small className="text-secondary">Pending</small>
                                    </div>
                                </div>
                                <h5 className="fw-semibold mt-3 mb-0">Renewals</h5>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>


        </div >
    );
}

