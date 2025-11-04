// // src/components/Login.js
// import { useState } from "react";
// import { auth } from "../firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// const Login = ({ setUser, setUserRole }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("employee"); // default role
//   const [isNewUser, setIsNewUser] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let userCredential;
//       if (isNewUser) {
//         // Create account
//         userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       } else {
//         // Sign in
//         userCredential = await signInWithEmailAndPassword(auth, email, password);
//       }
//       setUser(userCredential.user);
//       setUserRole(role);
//     } catch (error) {
//       console.error("Error during authentication", error);
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>{isNewUser ? "Sign Up" : "Login"}</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email: </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required />
//         </div>
//         <div>
//           <label>Password: </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required />
//         </div>
//         <div>
//           <label>Role: </label>
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="employee">Employee</option>
//             <option value="employer">Employer</option>
//           </select>
//         </div>
//         <button type="submit">{isNewUser ? "Sign Up" : "Login"}</button>
//       </form>
//       <p>
//         {isNewUser ? "Already have an account?" : "New user?"}{" "}
//         <button onClick={() => setIsNewUser(!isNewUser)}>
//           {isNewUser ? "Login" : "Sign Up"}
//         </button>
//       </p>
//     </div>
//   );
// };
// export default Login;
// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/authSlice";
import { Navigate, useNavigate, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error && (error.includes("not registered") || error.includes("database"))) {
      console.log("User not found, suggest registration");
    }
  }, [error]);

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="block w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full mb-3 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p
          className={`mt-3 text-center ${
            error.includes("not registered") ? "text-blue-600" : "text-red-500"
          }`}
        >
          {error}
        </p>
      )}

      {/* Register Link */}
      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-green-600 hover:text-green-800 font-medium"
        >
          Register here
        </Link>
      </p>
    </div>
  );
}
