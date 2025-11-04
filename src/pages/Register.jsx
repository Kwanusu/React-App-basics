// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginStart } from "../slices/authSlice"; // import from your slice
// import { useNavigate, Link } from "react-router-dom";

// export default function Register() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const { username, email, password } = formData;
//     if (!username || !email || !password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     // ✅ Simulate registration (replace with API call later)
//     const newUser = { name: username, email };
//     dispatch(loginStart(newUser)); // Redux action
//     navigate("/login");
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 shadow-lg rounded-xl w-96"
//       >
//         <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
//           Create Account
//         </h2>

//         {error && (
//           <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
//         )}

//         <div className="mb-4">
//           <label className="block text-gray-600 text-sm mb-2">Username</label>
//           <input
//             type="text"
//             name="username"
//             placeholder="Enter your username"
//             value={formData.username}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-lg px-3 py-2 w-full 
//                        focus:outline-none focus:ring-2 focus:ring-green-300"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-600 text-sm mb-2">Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-lg px-3 py-2 w-full 
//                        focus:outline-none focus:ring-2 focus:ring-green-300"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-600 text-sm mb-2">Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter a strong password"
//             value={formData.password}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-lg px-3 py-2 w-full 
//                        focus:outline-none focus:ring-2 focus:ring-green-300"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-green-600 text-white font-semibold px-4 py-2 
//                      rounded-lg hover:bg-green-700 w-full transition duration-300"
//         >
//           Register
//         </button>

//         <p className="text-sm text-center text-gray-500 mt-4">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-green-600 font-semibold hover:underline"
//           >
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }


// src/pages/Register.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(email, password, role));
  };

  // Watch for registration success or error
  useEffect(() => {
    if (user) {
      toast.success("Registration successful! Redirecting to login...");
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (error) {
      toast.error(error || "Registration failed. Please try again.");
    }
  }, [user, error, navigate]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="block w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="block w-full mb-3 p-2 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <span
          className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login here
        </span>
      </p>
    </div>
  );
}
