import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ShortUrlsService } from "../Api/services";

export default function EditUrl() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/edit-url/$id" });
  const [formData, setFormData] = useState({
    note: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [urlData, setUrlData] = useState(null);

  useEffect(() => {
    const fetchUrlData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the URL ID from the URL params
        let urlId = id;

        // Convert to number if it's a string
        if (urlId && typeof urlId === "string") {
          urlId = parseInt(urlId, 10);
        }

        if (!urlId || isNaN(urlId)) {
          setError(
            "URL ID not provided or invalid. Please try again from the dashboard."
          );
          return;
        }

        const response = await ShortUrlsService.getUrlById(urlId);
        setUrlData(response.data);
        setFormData({
          note: response.data.note || "",
        });
      } catch (e) {
        console.error("Error fetching URL data:", e);
        setError(
          e.response?.data?.message || e.message || "Failed to fetch URL data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUrlData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!urlData?.id) {
      setError("URL data not available. Please refresh the page.");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const requestData = {
        note: formData.note || null,
      };

      console.log("Editing URL with data:", requestData);
      await ShortUrlsService.editUrl(urlData.id, requestData);

      setSuccess("URL updated successfully!");

      // Redirect back to dashboard after a short delay
      setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 2000);
    } catch (e) {
      console.error("Error updating URL:", e);
      setError(
        e.response?.data?.message || e.message || "Failed to update URL"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleCancel = () => {
    navigate({ to: "/dashboard" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading URL data...</div>
      </div>
    );
  }

  if (error && !urlData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-red-500/10 backdrop-blur-md rounded-xl border border-red-500/20 p-8 shadow-xl">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-red-300">Error</h2>
              <p className="text-red-400">{error}</p>
              <button
                onClick={() => navigate({ to: "/dashboard" })}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-xl">
          <div className="text-center space-y-4">
            <div className="p-4 bg-blue-600 rounded-xl shadow-sm w-fit mx-auto">
              <img src="/logo_only.svg" alt="logo" className="w-16 h-16" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-white">Edit URL</h1>
              <p className="text-slate-400 mt-2 text-lg">
                Update your shortened URL information
              </p>
            </div>
          </div>
        </div>

        {/* URL Info Display */}
        {urlData && (
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6">
              URL Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <label className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                    Short URL
                  </label>
                  <a
                    href={`http://localhost:5140/${urlData.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-mono text-lg mt-1 block hover:underline transition-colors duration-200"
                  >
                    {urlData.shortCode}
                  </a>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <label className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                    Clicks
                  </label>
                  <p className="text-white text-lg font-medium mt-1">
                    {urlData.clicks}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <label className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                    Original URL
                  </label>
                  <a
                    href={urlData.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white text-lg mt-1 block hover:underline transition-colors duration-200 break-all"
                  >
                    {urlData.originalUrl}
                  </a>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <label className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                    Created
                  </label>
                  <p className="text-white text-lg font-medium mt-1">
                    {new Date(urlData.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Form */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Note (Optional)
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="Add a note to remember what this URL is for"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
                rows="4"
                maxLength={5000}
              />
              <p className="text-slate-400 text-xs mt-1">
                Optional note to help you remember what this URL is for (max
                5000 characters)
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <p className="text-emerald-400 text-sm">{success}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-slate-600 text-white py-3 px-6 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400/20 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Updating...
                  </>
                ) : (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Update URL
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
