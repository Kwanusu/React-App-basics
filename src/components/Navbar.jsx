import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isAuthenticated = !!user;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md relative">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-green-200 transition">
          InnovetTech!
        </Link>
      </div>

      {/* Nav Links */}
      <ul className="flex space-x-6 items-center">
        <li>
          <Link to="/counter" className="hover:text-green-200 transition">
            Counter
          </Link>
        </li>
        <li>
          <Link to="/posts" className="hover:text-green-200 transition">
            Posts
          </Link>
        </li>

        {isAuthenticated && (
          <li>
            <Link to="/" className="hover:text-green-200 transition">
              Dashboard
            </Link>
          </li>
        )}

        {/* Not logged in */}
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/login" className="hover:text-green-200 transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-green-200 transition">
                Register
              </Link>
            </li>
          </>
        )}

        {/* Logged in: Profile Dropdown */}
        {isAuthenticated && (
          <li className="relative" ref={dropdownRef}>
            {/* Profile Icon */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white hover:text-green-200 transition"
            >
              <FaUserCircle size={28} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}
