import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FiHome, FiSun, FiUser, FiBarChart2, FiMenu } from "react-icons/fi";

export default function Dashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { title: "Active Users", value: "1,245" },
    { title: "New Signups", value: "320" },
    { title: "Engagement", value: "72%" },
    { title: "Revenue", value: "$12,430" },
  ];

  const chartData = [
    { name: "Mon", value: 40 },
    { name: "Tue", value: 60 },
    { name: "Wed", value: 80 },
    { name: "Thu", value: 65 },
    { name: "Fri", value: 90 },
  ];

  const links = [
    { name: "Dashboard", icon: <FiHome />, to: "/" },
    { name: "Weather", icon: <FiSun />, to: "/weather" },
    { name: "Profile", icon: <FiUser />, to: "/profile" },
    { name: "Analytics", icon: <FiBarChart2 />, to: "/analytics" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 border-r transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 fixed md:static h-full z-20`}
      >
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold text-gray-700"> InnovetTech!</h1>
        </div>
        <nav className="mt-4">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="flex items-center px-6 py-3 hover:bg-green-100 text-gray-700 font-medium transition"
            >
              <span className="mr-3 text-lg">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 md:hidden z-30 p-2 bg-gray-700 text-white rounded-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FiMenu size={24} />
      </button>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8 flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome, {user?.name || "User"}!
              </h2>
              <p className="text-gray-500 mt-1">Here's your dashboard overview</p>
            </div>
          </header>

          {/* Stats Cards */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h3 className="text-gray-500 text-sm uppercase font-semibold">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold mt-2 text-gray-800">{item.value}</p>
              </div>
            ))}
          </section>

          {/* Chart */}
          <section className="bg-white rounded-2xl shadow-md p-6 mb-10">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Weekly Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 text-center shadow-lg mb-10">
            <h3 className="text-2xl font-bold mb-4">Ready to explore features?</h3>
            <p className="mb-6">Check weather, manage profile, and view analytics.</p>
            <Link
              to="/weather"
              className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              🌦 Get Started
            </Link>
          </section>
        </div>
      </main>

    </div>
  );
}
