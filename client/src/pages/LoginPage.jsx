// LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function LoginPage() {

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Step 1: login and get token
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);

      // Step 2: check if profile exists
      // we use the token we just got to make this request
      const profileRes = await api.get("/profile", {
        headers: { Authorization: `Bearer ${res.data.token}` }
      });

      // Step 3: profile exists → go to dashboard
      if (profileRes.data) {
        navigate("/dashboard");
      }

    } catch (err) {

      // if error is 404 → profile not found → first time user
      if (err.response?.status === 404) {
        navigate("/profile"); // send to profile setup
        return;
      }

      // any other error → login failed
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05060f] flex items-center justify-center px-4">
      <div className="bg-[#0d0e1f] p-10 rounded-3xl border border-gray-800/50 w-full max-w-lg">

        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Login to <span className="text-purple-400">StackMate</span>
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Welcome back! Enter your details to continue.
        </p>

        {error && (
          <p className="bg-red-500/10 text-red-400 text-sm px-4 py-2 rounded-lg mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 rounded-2xl bg-[#111827] border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-base"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 rounded-2xl bg-[#111827] border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-base"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-gray-500 text-sm mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;