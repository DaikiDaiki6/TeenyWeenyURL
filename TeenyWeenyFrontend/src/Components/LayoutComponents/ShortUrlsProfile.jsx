import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ShortUrlsService } from "../Api/services";

export default function ShortUrlsProfile() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/short-urls/$id" });
  const [urlData, setUrlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!urlData?.id) {
      setError("URL data not available. Please refresh the page.");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to delete the URL "${urlData.shortCode}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setDeleting(true);
      setError(null);

      await ShortUrlsService.deleteUrl(urlData.id);

      // Redirect back to dashboard
      navigate({ to: "/dashboard" });
    } catch (e) {
      console.error("Error deleting URL:", e);
      setError(
        e.response?.data?.message || e.message || "Failed to delete URL"
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    const urlId = urlData?.id || urlData?.Id || urlData?.ID;
    if (urlId) {
      navigate({ to: "/edit-url/$id", params: { id: String(urlId) } });
    }
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
        <div className="max-w-4xl mx-auto space-y-8">
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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* URL Details Card */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-xl">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-white">URL Details</h1>
            <p className="text-slate-300 mt-2">
              Complete information about your shortened URL
            </p>
          </div>

          {urlData && (
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

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <label className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                    Note (Optional)
                  </label>
                  <p className="text-slate-300 text-lg mt-1">
                    {urlData.note || "No note added"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {deleting ? (
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
                Deleting...
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete URL
              </>
            )}
          </button>
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit URL
          </button>
        </div>
      </div>
    </div>
  );
}
