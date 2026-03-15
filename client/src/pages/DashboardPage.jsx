// DashboardPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { user } = useAuth();

  const [myProjects, setMyProjects]         = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading]               = useState(true);
  const [activeTab, setActiveTab]           = useState("posted");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const [projectsRes, appsRes] = await Promise.all([
        api.get("/projects/my-projects"),
        api.get("/applications/my-applications"),
      ]);
      setMyProjects(projectsRes.data || []);
      setMyApplications(appsRes.data || []);
    } catch (err) {
      console.error("Failed to load dashboard", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05060f] flex items-center justify-center">
        <p className="text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060f]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Welcome Banner */}
        <div className="bg-[#0d0e1f] border border-gray-800 rounded-2xl p-6 mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">
            Welcome back, {user?.name || "Developer"} 👋
          </h1>
          <p className="text-gray-400 text-sm">
            Find exciting projects and collaborators today.
          </p>
        </div>

        {/* Stat Boxes */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div
            onClick={() => setActiveTab("posted")}
            className={`bg-[#0d0e1f] rounded-2xl p-6 cursor-pointer border transition-colors ${
              activeTab === "posted"
                ? "border-purple-600"
                : "border-gray-800 hover:border-gray-600"
            }`}
          >
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
              Projects Posted
            </p>
            <p className="text-4xl font-bold text-purple-400 mb-1">
              {myProjects.length}
            </p>
            <p className="text-xs text-gray-600">click to view</p>
          </div>

          <div
            onClick={() => setActiveTab("applied")}
            className={`bg-[#0d0e1f] rounded-2xl p-6 cursor-pointer border transition-colors ${
              activeTab === "applied"
                ? "border-purple-600"
                : "border-gray-800 hover:border-gray-600"
            }`}
          >
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
              Projects Applied
            </p>
            <p className="text-4xl font-bold text-purple-400 mb-1">
              {myApplications.length}
            </p>
            <p className="text-xs text-gray-600">click to view</p>
          </div>
        </div>

        {/* Projects Posted Section */}
        {activeTab === "posted" && (
          <div>
            <h2 className="text-base font-semibold text-white mb-4 pb-3 border-b border-gray-800">
              Projects I Posted
            </h2>

            {myProjects.length === 0 ? (
              <div className="bg-[#0d0e1f] border border-dashed border-gray-700 rounded-2xl p-8 text-center">
                <p className="text-gray-500 text-sm mb-2">
                  You haven't posted any projects yet.
                </p>
                <Link to="/create-project" className="text-purple-400 text-sm font-medium">
                  + Post your first project
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {myProjects.map((project) => (
                  <Link
                    to={`/projects/${project.id}`}
                    key={project.id}
                    className="bg-[#0d0e1f] border border-gray-800 rounded-xl px-5 py-4 flex justify-between items-center hover:border-purple-600 transition-colors"
                  >
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">
                        {project.title}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {project.applicationCount || 0} applications received
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      project.status === "open"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-gray-500/10 text-gray-400"
                    }`}>
                      {project.status.toUpperCase()}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Projects Applied Section */}
        {activeTab === "applied" && (
          <div>
            <h2 className="text-base font-semibold text-white mb-4 pb-3 border-b border-gray-800">
              Projects I Applied To
            </h2>

            {myApplications.length === 0 ? (
              <div className="bg-[#0d0e1f] border border-dashed border-gray-700 rounded-2xl p-8 text-center">
                <p className="text-gray-500 text-sm mb-2">
                  You haven't applied to any projects yet.
                </p>
                <Link to="/browse" className="text-purple-400 text-sm font-medium">
                  Browse projects →
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {myApplications.map((app) => (
                  <Link
                    to={`/projects/${app.projectId}`}
                    key={app.id}
                    className="bg-[#0d0e1f] border border-gray-800 rounded-xl px-5 py-4 block hover:border-purple-600 transition-colors"
                  >
                    {/* top row */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-semibold text-sm mb-1">
                          {app.projectTitle}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Applied {app.appliedAt}
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        app.status === "accepted"
                          ? "bg-green-500/10 text-green-400"
                          : app.status === "rejected"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}>
                        {app.status.toUpperCase()}
                      </span>
                    </div>

                    {/* contact card - only if accepted */}
                    {app.status === "accepted" && (
                      <div className="mt-4 p-4 bg-[#111827] rounded-xl border border-green-800/30">
                        <p className="text-xs text-green-400 font-semibold mb-3">
                          🎉 You're in! Contact the project owner:
                        </p>
                        <p className="text-sm text-gray-300 mb-1">
                          📧 {app.collaboratorEmail}
                        </p>
                        {app.collaboratorGithub && (
                          <p className="text-sm text-gray-300 mb-1">
                            💻 {app.collaboratorGithub}
                          </p>
                        )}
                        {app.collaboratorLinkedin && (
                          <p className="text-sm text-gray-300">
                            🔗 {app.collaboratorLinkedin}
                          </p>
                        )}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default DashboardPage;