import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
        // ✅ CHANGE 1: Responsive layout
        <div className="min-vh-100 d-flex flex-row">

            {/* LEFT IMAGE */}
            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    flex: 1,
                    backgroundImage: `url(${leftBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minHeight: "50vh"   // ✅ CHANGE 2: Mobile height fix
                }}
            ></div>

            {/* RIGHT FORM */}
            <div
                className="d-flex flex-column justify-content-center align-items-center bg-light"
                style={{
                    flex: 1,
                    padding: "20px",   // ✅ CHANGE 3: Mobile padding fix (was 60px)
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
                        width: "100%",   // ✅ CHANGE 4: Input overflow fix
                        maxWidth: "420px",
                        padding: "0 10px"
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
// import leftBg from "../images/logo1.jpg";

// const API = process.env.REACT_APP_API_URL;

// export default function Login() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         try {
//             const res = await axios.post(`${API}/auth/login`, {
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
//         <div className="vh-100 d-flex">
//             {/* LEFT SIDE — full background image */}
//             <div
//                 className="d-flex justify-content-center align-items-center"
//                 style={{
//                     flex: 1,
//                     backgroundImage: `url(${leftBg})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     backgroundRepeat: "no-repeat",
//                 }}
//             ></div>

//             {/* RIGHT SIDE - Open Form (no box) */}
//             <div
//                 className="d-flex flex-column justify-content-center align-items-center bg-light"
//                 style={{
//                     flex: 1,
//                     padding: "60px",
//                 }}
//             >
//                 <h2
//                     className="fw-bold mb-4"
//                     style={{ color: "#102B4C", letterSpacing: "0.5px" }}
//                 >
//                     Welcome Back!
//                 </h2>
//                 <p className="text-muted mb-5 fs-5">Sign in to continue</p>

//                 <div
//                     style={{
//                         width: "80%",
//                         maxWidth: "420px",
//                     }}
//                 >
//                     <div className="mb-4">
//                         <input
//                             type="text"
//                             className="form-control form-control-lg"
//                             placeholder="Enter Username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             style={{
//                                 borderRadius: "10px",
//                                 fontSize: "1.1rem",
//                                 padding: "14px",
//                             }}
//                         />
//                     </div>

//                     <div className="mb-5">
//                         <input
//                             type="password"
//                             className="form-control form-control-lg"
//                             placeholder="Enter Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             style={{
//                                 borderRadius: "10px",
//                                 fontSize: "1.1rem",
//                                 padding: "14px",
//                             }}
//                         />
//                     </div>

//                     <button
//                         className="btn w-100 py-3 fs-5 fw-semibold text-white"
//                         onClick={handleLogin}
//                         style={{
//                             borderRadius: "10px",
//                             backgroundColor: "#102B4C",
//                             border: "none",
//                         }}
//                     >
//                         Sign in
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

