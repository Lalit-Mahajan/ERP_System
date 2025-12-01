// src/layout/Layout.js
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../images/LogoNew.png";

export default function Layout() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="d-flex">
            {/* SIDEBAR */}
            <div
                className="d-flex flex-column justify-content-between bg-dark text-white"
                style={{
                    width: isOpen ? "250px" : "0px",
                    height: "100vh",
                    background: "linear-gradient(180deg, #0b1e47, #05204e)",
                    overflow: "hidden",
                    transition: "width 0.3s ease",
                    position: "fixed",
                    padding: isOpen ? "30px 20px" : "30px 0px",
                }}
            >
                <div>
                    {/* Logo */}
                    <div className="text-center mb-2">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="WT Winds Logo"
                                className="img-fluid"
                                style={{
                                    width: isOpen ? "210px" : "0px",
                                    height: "auto",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                }}
                            />
                        </Link>
                    </div>

                    {/* Navigation */}
                    {isOpen && (
                        <ul className="nav flex-column fs-5 mt-3">

                            <li className="nav-item mb-3 d-flex align-items-center">
                                <i className="bi bi-house-door me-3 fs-4"></i>
                                <Link to="/home" className="nav-link text-white p-0">
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item mb-3 d-flex align-items-center">
                                <i className="bi bi-calendar-event me-3 fs-4"></i>
                                <Link to="#" className="nav-link text-white p-0">
                                    Calendar
                                </Link>
                            </li>

                            <li className="nav-item mb-3 d-flex align-items-center">
                                <i className="bi bi-clipboard-data me-3 fs-4"></i>
                                <Link to="#" className="nav-link text-white p-0">
                                    Reports
                                </Link>
                            </li>

                            <li className="nav-item mb-3 d-flex align-items-center">
                                <i className="bi bi-people me-3 fs-4"></i>
                                <Link to="/teams" className="nav-link text-white p-0">
                                    Teams
                                </Link>
                            </li>

                            <li className="nav-item mb-3 d-flex align-items-center">
                                <i className="bi bi-gear me-3 fs-4"></i>
                                <Link to="#" className="nav-link text-white p-0">
                                    Settings
                                </Link>
                            </li>

                            {/* ✅ Update DB - SAME FONT, SAME SIZE, SAME GAP */}
                            <li className="nav-item mb-3 d-flex align-items-center">
                                <i className="bi bi-upload me-3 fs-4"></i>
                                <Link to="/update-db" className="nav-link text-white p-0">
                                    Update DB
                                </Link>
                            </li>

                        </ul>
                    )}
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div
                className="flex-grow-1 p-4"
                style={{
                    marginLeft: isOpen ? "250px" : "0px",
                    transition: "margin-left 0.3s ease",
                }}
            >
                {/* TOP BAR */}
                <button
                    className="btn btn-outline-secondary mb-3"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <i className="bi bi-list fs-4"></i>
                </button>

                {/* PAGE CONTENT */}
                <Outlet />
            </div>
        </div>
    );
}
