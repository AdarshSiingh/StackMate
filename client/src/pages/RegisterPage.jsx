// RegisterPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function RegisterPage() {

  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05060f] flex items-center justify-center px-4">

      <div className="bg-[#0d0e1f] p-10 rounded-3xl border border-gray-800/50 w-full max-w-lg">

        {/* Title - centered, no label above inputs */}
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Create your account
        </h1>

        {/* Error message */}
        {error && (
          <p className="bg-red-500/10 text-red-400 text-sm px-4 py-2 rounded-lg mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name - no label, just placeholder */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-4 rounded-2xl bg-[#111827] border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-base"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 rounded-2xl bg-[#111827] border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-base"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full p-4 rounded-2xl bg-[#111827] border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-base"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg transition-colors"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

        </form>

        <p className="text-gray-500 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default RegisterPage;