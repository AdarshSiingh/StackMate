// ProfilePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const SKILL_SUGGESTIONS = [
  "React",
  "Node.js",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Go",
  "AI",
  "Machine Learning",
  "Data Science",
  "Next.js",
  "Express",
  "MongoDB",
  "MySQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "GraphQL"
];

function ProfilePage() {
  const { user } = useAuth();
  const navigate  = useNavigate();

  const [isNewUser, setIsNewUser]     = useState(true);
  const [username, setUsername]       = useState("");
  const [age, setAge]                 = useState("");
  const [email, setEmail]             = useState(user?.email || "");
  const [bio, setBio]                 = useState("");
  const [experience, setExperience]   = useState("Beginner");
  const [skills, setSkills]           = useState([]);
  const [skillInput, setSkillInput]   = useState("");
  const [github, setGithub]           = useState("");
  const [linkedin, setLinkedin]       = useState("");

  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState("");
  // calculate profile completion
const fields = [username, age, email, bio, experience, github, linkedin];

const filledFields = fields.filter((field) => field && field !== "").length;

const completion = Math.round((filledFields / fields.length) * 100);

const filteredSkills = SKILL_SUGGESTIONS.filter(
  (skill) =>
    skill.toLowerCase().includes(skillInput.toLowerCase()) &&
    !skills.includes(skill)
  ).slice(0, 5);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await api.get("/profile");

      // profile found → returning user, pre-fill all fields
      setIsNewUser(false);
      setUsername(res.data.username || "");
      setAge(res.data.age || "");
      setEmail(res.data.email || user?.email || "");
      setBio(res.data.bio || "");
      setExperience(res.data.experience || "Beginner");
      setSkills(res.data.skills || []);
      setGithub(res.data.github || "");
      setLinkedin(res.data.linkedin || "");
    } catch (err) {
      // 404 = no profile yet → first time user, form stays empty
      setIsNewUser(true);
    } finally {
      setLoading(false);
    }
  }

  // add skill on Enter or Add button click
  function addSkill(e) {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput("");
  }

  // remove skill by clicking X
  function removeSkill(skill) {
    setSkills(skills.filter((s) => s !== skill));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await api.put("/profile", {
        username, age, email, bio,
        experience, skills, github, linkedin,
      });

      if (isNewUser) {
        navigate("/dashboard"); // first time → go to dashboard
      } else {
        setSuccess("Profile updated successfully!"); // returning → stay on page
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05060f] flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060f]">
      <Navbar />

      <div className="max-w-xl mx-auto px-6 py-10">

        {/* heading changes based on new or returning user */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isNewUser ? "Set up your profile" : "Edit your profile"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isNewUser
              ? "Tell the community who you are"
              : "Update your details anytime"}
          </p>
        </div>
        {/* Profile completion indicator */}
         <div className="mb-6">
         <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Profile Completion</span>
          <span>{completion}%</span>
         </div>

          <div className="w-full bg-gray-800 rounded-full h-2">
         <div
          className="bg-purple-500 h-2 rounded-full transition-all"
          style={{ width: `${completion}%` }}
          ></div>
          </div>
        </div>

        <div className="bg-[#0d0e1f] border border-gray-800 rounded-2xl p-8">

          {error && (
            <p className="bg-red-500/10 text-red-400 text-sm px-4 py-2 rounded-lg mb-4 text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="bg-green-500/10 text-green-400 text-sm px-4 py-2 rounded-lg mb-4 text-center">
              ✅ {success}
            </p>
          )}

          <form onSubmit={handleSave} className="space-y-5">

            {/* Username + Age */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-500 text-sm block mb-2">Username</label>
                <input
                  type="text"
                  placeholder="@johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-3 bg-[#111827] border border-gray-700/50 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-gray-500 text-sm block mb-2">Age</label>
                <input
                  type="number"
                  placeholder="22"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  min={13}
                  max={100}
                  className="w-full p-3 bg-[#111827] border border-gray-700/50 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-500 text-sm block mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 bg-[#111827] border border-gray-700/50 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="text-gray-500 text-sm block mb-2">Bio</label>
              <textarea
                placeholder="Tell others what you love to build..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full p-3 bg-[#111827] border border-gray-700/50 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            {/* Experience level */}
            <div>
              <label className="text-gray-500 text-sm block mb-3">
                Experience Level
              </label>
              <div className="flex gap-3">
                {LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setExperience(level)}
                    className={`px-5 py-2 rounded-full text-sm border transition-colors ${
                      experience === level
                        ? "bg-purple-600 border-purple-600 text-white font-semibold"
                        : "bg-transparent border-gray-700 text-gray-500"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills - type and add */}
            <div>
              <label className="text-gray-500 text-sm block mb-2">Skills</label>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="e.g. React, Java, AI/ML..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill(e)}
                  className="flex-1 p-3 bg-[#111827] border border-gray-700/50 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500"
                />
                {skillInput && filteredSkills.length > 0 && (
                <div className="bg-[#111827] border border-gray-700 rounded-xl mt-2 overflow-hidden">
                 {filteredSkills.map((skill) => (
                <div
                 key={skill}
                  onClick={() => {
                   setSkills([...skills, skill]);
                 setSkillInput("");
                }}
                  className="px-3 py-2 text-sm text-gray-300 hover:bg-purple-600/30 cursor-pointer"
              >
                    {skill}
                </div>
                   ))}
                  </div>
                 )}
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Add
                </button>
              </div>

              {/* skill tags */}
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-2 bg-purple-600/20 border border-purple-600/40 text-purple-300 text-xs px-3 py-1.5 rounded-full"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-purple-400 hover:text-white font-bold transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <p className="text-gray-600 text-xs mt-2">
                Press Enter or click Add to add a skill
              </p>
            </div>

            {/* GitHub */}
            <div>
              <label className="text-gray-500 text-sm block mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/yourusername"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full p-3 bg-[#111827] border border-gray-700/50 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="text-gray-500 text-sm block mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/yourusername"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full p-3 bg-[#111827] border border-gray-700/50 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* button text changes based on new or returning user */}
            <button
              type="submit"
              disabled={saving}
              className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base rounded-2xl transition-colors"
            >
              {saving
                ? "Saving..."
                : isNewUser
                ? "Save & Continue →"
                : "Update Profile"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;