import { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { saveAs } from "file-saver";

const API = process.env.REACT_APP_API_URL;

export default function Update() {
    const [rows, setRows] = useState([]);
    const [fileName, setFileName] = useState("");

    const [successCount, setSuccessCount] = useState(0);
    const [failCount, setFailCount] = useState(0);

    const [successRows, setSuccessRows] = useState([]);
    const [failedRows, setFailedRows] = useState([]);
    const [statusMessage, setStatusMessage] = useState("");

    const handleCSV = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setFileName(file.name);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {

                // 1️⃣ Required CSV Columns
                const required = [
                    "teamId", "productId", "productName", "teamName",
                    "userId", "fullname", "teamManager", "roleId", "ratings"
                ];

                const csvCols = Object.keys(result.data[0]);

                // 2️⃣ Check CSV Header mismatches
                const missing = required.filter(col => !csvCols.includes(col));

                if (missing.length) {
                    alert("❌ CSV Header Mismatch: " + missing.join(", "));
                    setRows([]);
                    return;
                }

                // 3️⃣ Clean Rows (convert values)
                const cleanRows = result.data.map(row => ({
                    teamId: row.teamId,
                    productId: row.productId,
                    productName: row.productName,
                    teamName: row.teamName,
                    userId: row.userId,
                    fullname: row.fullname,
                    teamManager: row.teamManager,
                    roleId: row.roleId,
                    ratings: row.ratings ?? ""
                }));

                setRows(cleanRows);
            }
        });
    };
    const submitData = async () => {
        const response = await axios.post(
            `${API}/update/update-teams`,
            { rows }
        );

        setSuccessCount(response.data.successCount);
        setFailCount(response.data.failCount);
        setSuccessRows(response.data.successRows);
        setFailedRows(response.data.failedRows);

        // SUCCESS MESSAGE SHOW
        if (response.data.failCount === 0) {
            setStatusMessage("✔ All Records Updated Successfully");
        } else {
            setStatusMessage("");
        }
    };


    const downloadCSV = (data, name) => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, name);
    };

    return (
        <div className="p-4">

            <h2 className="fw-semibold mb-4" style={{ color: "#0b1e47" }}>
                Update DB
            </h2>

            {/* CSV Upload */}
            <div className="mb-4 d-flex align-items-center">
                <label className="fw-semibold me-3" style={{ width: "300px" }}>
                    Please Upload the Data in CSV Format:
                </label>

                <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSV}
                    className="form-control w-25 me-3"
                />

                {fileName && (
                    <span className="text-primary fw-semibold">{fileName}</span>
                )}
            </div>

            {/* Submit */}
            <div className="mb-5 d-flex align-items-center">
                <label className="fw-semibold me-3" style={{ width: "300px" }}>
                    Please Submit the Data in CSV Format:
                </label>

                <button className="btn btn-primary px-4" onClick={submitData}>
                    Submit
                </button>
            </div>

            {/* Result */}
            <div className="mb-3 fw-semibold">Results:</div>
            {statusMessage && (
                <div className="alert alert-success fw-semibold" style={{ width: "450px" }}>
                    {statusMessage}
                </div>
            )}

            <table className="table table-bordered text-center" style={{ width: "450px" }}>
                <thead className="table-light">
                    <tr>
                        <th style={{ padding: "15px" }}>Success</th>
                        <th style={{ padding: "15px" }}>Fail</th>
                        <th style={{ padding: "15px" }}>Download</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: "20px" }}>{successCount}</td>
                        <td style={{ padding: "20px" }}>{failCount}</td>
                        <td style={{ padding: "20px" }}>
                            <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() => downloadCSV(successRows, "success.csv")}
                            >
                                Success CSV
                            </button>

                            <button
                                className="btn btn-sm btn-danger ms-3"
                                onClick={() => downloadCSV(failedRows, "fail.csv")}
                            >
                                Fail CSV
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>


            {/* 🔵 Success Rows Table */}
            {successRows.length > 0 && (
                <>
                    <h5 className="fw-semibold mt-5">Success Records</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-success">
                                <tr>
                                    {Object.keys(successRows[0]).map((col, i) => (
                                        <th key={i}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {successRows.map((row, idx) => (
                                    <tr key={idx}>
                                        {Object.values(row).map((val, j) => (
                                            <td key={j}>{val}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* 🔵 Failed Rows Table */}
            {failedRows.length > 0 && (
                <>
                    <h5 className="fw-semibold mt-4">Failed Records</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-danger">
                                <tr>
                                    {Object.keys(failedRows[0]).map((col, i) => (
                                        <th key={i}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {failedRows.map((row, idx) => (
                                    <tr key={idx}>
                                        {Object.values(row).map((val, j) => (
                                            <td key={j}>{val}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* MAIN CSV Preview */}
            {rows.length > 0 && (
                <>
                    <h5 className="fw-semibold mt-4">CSV Data Preview</h5>
                    <div className="table-responsive mt-2">
                        <table className="table table-bordered table-striped">
                            <thead className="table-primary">
                                <tr>
                                    {Object.keys(rows[0]).map((col, i) => (
                                        <th key={i}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, idx) => (
                                    <tr key={idx}>
                                        {Object.values(row).map((val, j) => (
                                            <td key={j}>{val}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

        </div>
    );
}
