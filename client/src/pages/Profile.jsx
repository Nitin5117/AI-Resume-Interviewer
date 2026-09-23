import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  CalendarDays,
  FileText,
  Mic,
  CheckCircle2,
  TrendingUp,
  Trophy,
  Pencil,
  X,
  Loader2,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import {
  getProfile,
  updateProfile,
} from "../services/profileService";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        setProfile(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleOpenEditModal = () => {
    setFormData({
      name: profile.user.firstname || "",
      email: profile.user.email || "",
    });

    setShowEditModal(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required.");
      return;
    }

    try {
      setUpdating(true);

      const response = await updateProfile(formData);

      setProfile((previous) => ({
        ...previous,
        user: response.data,
      }));

      toast.success("Profile updated successfully!");

      setShowEditModal(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile.",
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2
            size={36}
            className="animate-spin text-indigo-400"
          />
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-red-400">
            Failed to load profile.
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  const { user, stats } = profile;

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  const userInitial =
    user.name?.charAt(0).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    "U";

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Profile
            </h1>

            <p className="mt-2 text-slate-400">
              View and manage your account information.
            </p>
          </div>

          <button
            onClick={handleOpenEditModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            <Pencil size={18} />

            Edit Profile
          </button>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-5xl font-bold text-indigo-400 ring-4 ring-indigo-500/20">
              {userInitial}
            </div>

            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.25em] text-indigo-400">
                Account Information
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                {user.username || "AI Interview Candidate"}
              </h2>

              <div className="mt-6 flex flex-col gap-4 text-slate-400 sm:flex-row sm:flex-wrap sm:gap-8">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-indigo-400" />

                  <span>{user.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <CalendarDays
                    size={20}
                    className="text-indigo-400"
                  />

                  <span>Joined {joinedDate}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={20} />

                <span className="font-semibold">
                  Active Account
                </span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            Performance Overview
          </h2>

          <p className="mt-2 text-slate-400">
            Your complete activity across the AI Interview Platform.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
            <ProfileStatCard
              title="Total Resumes"
              value={stats.totalResumes}
              icon={<FileText size={24} />}
            />

            <ProfileStatCard
              title="Total Interviews"
              value={stats.totalInterviews}
              icon={<Mic size={24} />}
            />

            <ProfileStatCard
              title="Completed"
              value={stats.completedInterviews}
              icon={<CheckCircle2 size={24} />}
            />

            <ProfileStatCard
              title="Average Score"
              value={`${stats.averageScore}%`}
              icon={<TrendingUp size={24} />}
            />

            <ProfileStatCard
              title="Best Score"
              value={`${stats.bestScore}%`}
              icon={<Trophy size={24} />}
            />
          </div>
        </section>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Edit Profile
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Update your account information.
                </p>
              </div>

              <button
                onClick={() => setShowEditModal(false)}
                disabled={updating}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <form
              onSubmit={handleUpdateProfile}
              className="mt-8 space-y-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Name
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  disabled={updating}
                  className="flex-1 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updating ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

const ProfileStatCard = ({ title, value, icon }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between">
        <p className="text-slate-400">{title}</p>

        <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
          {icon}
        </div>
      </div>

      <h3 className="mt-5 text-3xl font-bold text-white">
        {value}
      </h3>
    </div>
  );
};

export default Profile;
