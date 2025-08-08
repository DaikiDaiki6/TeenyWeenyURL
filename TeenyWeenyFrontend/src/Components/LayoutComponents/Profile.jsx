import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ShortUrlsService, AuthService, UserService } from "../Api/services";

export default function Profile() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [userInfo, setUserInfo] = useState({
    userId: null,
    username: "",
  });
  const [urlData, setUrlData] = useState({
    items: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user info and URLs in parallel
        const [authResponse, urlsResponse] = await Promise.all([
          AuthService.authCheck(),
          ShortUrlsService.getAllUrls(page, pageSize).catch((e) => {
            if (e.response?.status === 404) {
              return {
                data: {
                  items: [],
                  currentPage: page,
                  pageSize: pageSize,
                  totalItems: 0,
                  totalPages: 0,
                  hasNextPage: false,
                  hasPreviousPage: false,
                },
              };
            }
            throw e;
          }),
        ]);

        console.log("Auth Response:", authResponse.data);
        console.log("URLs Response:", urlsResponse.data);

        setUserInfo({
          userId: authResponse.data.userId,
          username: authResponse.data.username,
        });

        setUrlData(urlsResponse.data);
        setEditForm({
          username: authResponse.data.username,
          password: "",
        });
      } catch (e) {
        console.error("Error fetching profile data:", e);
        setError(e.message || "Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setFormLoading(true);

      // Validation
      if (!editForm.username.trim()) {
        setError("Username cannot be empty");
        return;
      }

      if (editForm.username.trim().length < 3) {
        setError("Username must be at least 3 characters long");
        return;
      }

      if (editForm.password && editForm.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      const updateData = {};

      if (editForm.username.trim() !== userInfo.username) {
        updateData.username = editForm.username.trim();
      }

      if (editForm.password) {
        updateData.password = editForm.password;
      }

      if (Object.keys(updateData).length === 0) {
        setShowEditForm(false);
        return;
      }

      console.log("Updating profile with data:", updateData);
      const response = await UserService.editUser(updateData);
      console.log("Profile update response:", response.data);

      // Update local state with new username if it changed
      if (updateData.username) {
        setUserInfo((prev) => ({ ...prev, username: updateData.username }));
        // Update edit form to reflect the new username
        setEditForm((prev) => ({ ...prev, username: updateData.username }));
      }

      setShowEditForm(false);
      setEditForm((prev) => ({ ...prev, password: "" })); // Clear password field

      // Show success message temporarily
      setSuccess("Profile updated successfully!");
      setError(null);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (e) {
      console.error("Error updating profile:", e);
      let errorMessage = "Failed to update profile";

      if (e.response?.status === 400) {
        errorMessage = "Invalid data provided";
      } else if (e.response?.status === 409) {
        errorMessage = "Username already exists";
      } else if (e.response?.data?.message) {
        errorMessage = e.response.data.message;
      } else if (e.message) {
        errorMessage = e.message;
      }

      setError(errorMessage);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setError(null);
      await UserService.deleteUser();

      // Clear token and redirect to home
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (e) {
      console.error("Error deleting profile:", e);
      setError(
        e.response?.data?.message || e.message || "Failed to delete profile"
      );
    }
  };

  const allUrls = urlData.items || [];
  const totalCount = urlData.totalItems || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="p-4 bg-blue-600 rounded-xl shadow-sm">
                <img src="/logo_only.svg" alt="profile" className="w-20 h-20" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-white">
                {userInfo.username}
              </h1>
              <p className="text-slate-400 mt-1">URL Shortener Enthusiast</p>
            </div>

            {/* Profile Actions */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowEditForm(!showEditForm)}
                className="bg-blue-500/10 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-all duration-200 text-sm"
              >
                Edit Profile
              </button>
              <button
                onClick={handleDeleteProfile}
                className="bg-red-500/10 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all duration-200 text-sm"
              >
                Delete Profile
              </button>
            </div>
          </div>

          {/* Edit Form */}
          {showEditForm && (
            <div className="mt-6 p-6 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">
                Edit Profile
              </h3>
              <form onSubmit={handleEditProfile} className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={formLoading}
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    New Password (leave empty to keep current)
                  </label>
                  <input
                    type="password"
                    value={editForm.password}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={formLoading}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {formLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditForm(false);
                      setError(null);
                      setSuccess(null);
                    }}
                    disabled={formLoading}
                    className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400">Error: {error}</p>
          </div>
        )}

        {/* Success Display */}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
            <p className="text-emerald-400">{success}</p>
          </div>
        )}

        {/* URLs Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Your Short URLs
            </h2>
            <div className="flex items-center gap-3">
              <Link
                to="/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm flex items-center gap-2 whitespace-nowrap"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create New
              </Link>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {totalCount}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-slate-300 font-medium">
                    Short URL
                  </th>
                  <th className="text-left py-4 px-4 text-slate-300 font-medium">
                    Original URL
                  </th>
                  <th className="text-left py-4 px-4 text-slate-300 font-medium">
                    Note
                  </th>
                  <th className="text-left py-4 px-4 text-slate-300 font-medium">
                    Clicks
                  </th>
                  <th className="text-left py-4 px-4 text-slate-300 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUrls.length === 0 ? (
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                    <td colSpan="5" className="py-8 px-4 text-center">
                      <div className="space-y-4">
                        <span className="text-slate-400 text-lg block">
                          No URLs created yet
                        </span>
                        <Link
                          to="/create"
                          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Create Your First Short URL
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  allUrls.map((url, index) => (
                    <tr
                      key={url.shortCode || index}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="py-4 px-4">
                        <a
                          href={`http://localhost:5140/${url.shortCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 font-mono bg-blue-500/10 px-3 py-1 rounded-lg hover:bg-blue-500/20 transition-all duration-200"
                        >
                          {url.shortCode}
                        </a>
                      </td>
                      <td className="py-4 px-4">
                        <a
                          href={url.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-white transition-colors duration-200 truncate block max-w-xs"
                          title={url.originalUrl}
                        >
                          {url.originalUrl}
                        </a>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-slate-300 text-sm">
                          {url.note || "-"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-slate-300 text-sm">
                          {url.clicks}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          {url.id ? (
                            <Link
                              to="/edit-url/$id"
                              params={{ id: String(url.id) }}
                              className="bg-blue-500/10 text-blue-300 px-3 py-1 rounded-lg hover:bg-blue-500/20 transition-all duration-200 text-sm"
                            >
                              Edit
                            </Link>
                          ) : (
                            <span className="text-slate-400 text-sm">
                              Loading...
                            </span>
                          )}
                          {url.id ? (
                            <Link
                              to="/short-urls/$id"
                              params={{ id: String(url.id) }}
                              className="bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-lg hover:bg-emerald-500/20 transition-all duration-200 text-sm"
                            >
                              Info
                            </Link>
                          ) : (
                            <span className="text-slate-400 text-sm">
                              Loading...
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {urlData.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-slate-400 text-sm">
                Showing {(urlData.currentPage - 1) * urlData.pageSize + 1} to{" "}
                {Math.min(
                  urlData.currentPage * urlData.pageSize,
                  urlData.totalItems
                )}{" "}
                of {urlData.totalItems} URLs
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={!urlData.hasPreviousPage}
                  className="bg-blue-500/10 text-blue-300 px-3 py-2 rounded-lg hover:bg-blue-500/20 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-slate-300 px-3 py-2 text-sm">
                  Page {urlData.currentPage} of {urlData.totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!urlData.hasNextPage}
                  className="bg-blue-500/10 text-blue-300 px-3 py-2 rounded-lg hover:bg-blue-500/20 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
