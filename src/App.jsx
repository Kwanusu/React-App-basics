import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import Weather from "./Weather";
import Counter from "./components/Counter";
import PostList from "./components/Posts"
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { listenToAuthChanges } from "./slices/authSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout wrapper to hide Navbar/Footer on login/register
function Layout({ children }) {
  const location = useLocation();
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="flex-grow min-h-[80vh] px-4 py-6 bg-gray-50">
        {children}
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}
 function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <ToastContainer position="top-center" autoClose={2000} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/weather" element={<Weather />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/posts" element={<PostList />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
