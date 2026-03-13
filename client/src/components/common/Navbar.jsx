import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-black text-white">

      <Link to="/" className="text-2xl font-bold">
       <h1 className="text-2xl font-bold">
        Stack<span className="text-purple-400">Mate</span>
       </h1>
      </Link>

      <div className="space-x-6">
        <Link to="/login" className="hover:text-purple-400">
          Login
        </Link>

        <Link
          to="/register"
          className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500"
        >
          Sign Up
        </Link>
      </div>

    </nav>
  );
}