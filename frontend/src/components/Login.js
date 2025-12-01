import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import logo from "../images/logo.jpg"; // ✅ Make sure this path is correct
import leftBg from "../images/logo1.jpg";

const API = process.env.REACT_APP_API_URL;

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${API}/auth/login`, {
                username,
                password,
            });
            if (res.data.success) {
                navigate("/home");
            } else {
                alert("Invalid Username or Password");
            }
        } catch (err) {
            alert("Login failed. Check server connection.");
        }
    };

    return (
        <div className="vh-100 d-flex">
            {/* LEFT SIDE — full background image */}
            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    flex: 1,
                    backgroundImage: `url(${leftBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            ></div>

            {/* RIGHT SIDE - Open Form (no box) */}
            <div
                className="d-flex flex-column justify-content-center align-items-center bg-light"
                style={{
                    flex: 1,
                    padding: "60px",
                }}
            >
                <h2
                    className="fw-bold mb-4"
                    style={{ color: "#102B4C", letterSpacing: "0.5px" }}
                >
                    Welcome Back!
                </h2>
                <p className="text-muted mb-5 fs-5">Sign in to continue</p>

                <div
                    style={{
                        width: "80%",
                        maxWidth: "420px",
                    }}
                >
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                borderRadius: "10px",
                                fontSize: "1.1rem",
                                padding: "14px",
                            }}
                        />
                    </div>

                    <div className="mb-5">
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                borderRadius: "10px",
                                fontSize: "1.1rem",
                                padding: "14px",
                            }}
                        />
                    </div>

                    <button
                        className="btn w-100 py-3 fs-5 fw-semibold text-white"
                        onClick={handleLogin}
                        style={{
                            borderRadius: "10px",
                            backgroundColor: "#102B4C",
                            border: "none",
                        }}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}




// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         try {
//             const res = await axios.post("http://localhost:5000/api/auth/login", {
//                 username,
//                 password,
//             });
//             if (res.data.success) {
//                 navigate("/home");
//             } else {
//                 alert("Invalid Username or Password");
//             }
//         } catch (err) {
//             alert("Login failed. Check server connection.");
//         }
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//             <div
//                 className="card shadow-lg p-5"
//                 style={{
//                     width: "40rem", // much wider (fits web)
//                     borderRadius: "25px",
//                     background: "white",
//                 }}
//             >
//                 <h1 className="text-center mb-5">Login Admin</h1>

//                 <div className="mb-4">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         style={{
//                             padding: "18px",
//                             fontSize: "1.3rem",
//                             borderRadius: "12px",
//                         }}
//                     />
//                 </div>

//                 <div className="mb-5">
//                     <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Enter Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         style={{
//                             padding: "18px",
//                             fontSize: "1.3rem",
//                             borderRadius: "12px",
//                         }}
//                     />
//                 </div>

//                 <button
//                     className="btn btn-primary w-100 py-3 fs-4 fw-semibold"
//                     onClick={handleLogin}
//                     style={{
//                         borderRadius: "12px",
//                         letterSpacing: "0.5px",
//                     }}
//                 >
//                     Login
//                 </button>
//             </div>
//         </div>
//     );
// }
