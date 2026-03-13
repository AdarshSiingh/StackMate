import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function LandingPage() {
  return (
    <div className="bg-[#050510] min-h-screen text-white">

      {/* Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 min-h-[90vh]">

        {/* Badge */}
        <div className="mb-5">
          <span className="text-purple-300 border border-purple-500/30 px-5 py-2 rounded-full text-sm tracking-widest">
            FOR DEVELOPERS, BY DEVELOPERS
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Find Your
          <br />
          <span className="text-purple-400">Project Buddy</span>
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-lg mt-4 max-w-2xl">
            StackMate helps developers find teammates, share project ideas,
            <br />
            and collaborate on real-world projects.
       </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">

          <Link
            to="/register"
            className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-xl text-lg font-semibold"
          >
            Get Started →
          </Link>

          <Link
            to="/login"
            className="border border-gray-700 px-8 py-3 rounded-xl text-lg hover:border-purple-500"
          >
            Login
          </Link>

        </div>

        {/* Stats */}
        <div className="flex gap-16 mt-12 text-center">

          <div>
            <h2 className="text-3xl font-bold text-purple-400">2.4K</h2>
            <p className="text-gray-400 mt-1">Developers</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-purple-400">840</h2>
            <p className="text-gray-400 mt-1">Projects</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-purple-400">320</h2>
            <p className="text-gray-400 mt-1">Collaborations</p>
          </div>

        </div>

      </section>

    </div>
  );
}