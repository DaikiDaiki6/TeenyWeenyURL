import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ShortUrlsService } from "../Api/services";

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
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
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching URLs with page:", page, "pageSize:", pageSize);
        const response = await ShortUrlsService.getAllUrls(page, pageSize);
        console.log("API Response:", response.data);
        setUrlData(response.data);
      } catch (e) {
        console.error("Full error object:", e);
        if (e.response?.status === 404) {
          setUrlData({
            items: [],
            currentPage: page,
            pageSize: pageSize,
            totalItems: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false,
          });
        } else {
          setError(e.message || "Failed to fetch URLs");
          console.error("Error fetching URLs:", e);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, [page, pageSize]);

  const handleDelete = async (id, shortCode) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the URL "${shortCode}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setDeletingId(id);
      setError(null);

      await ShortUrlsService.deleteUrl(id);

      // Refresh the URL list
      try {
        const response = await ShortUrlsService.getAllUrls(page, pageSize);
        setUrlData(response.data);
      } catch (e) {
        console.error("Error refreshing URLs after deletion:", e);
        if (e.response?.status === 404) {
          // No URLs found after deletion, set empty state
          setUrlData({
            items: [],
            currentPage: 1,
            pageSize: pageSize,
            totalItems: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false,
          });
          // Clear any existing errors since this is expected behavior
          setError(null);
        } else {
          setError(e.message || "Failed to refresh URLs after deletion");
        }
      }
    } catch (e) {
      console.error("Error deleting URL:", e);
      setError(
        e.response?.data?.message || e.message || "Failed to delete URL"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const allUrls = urlData.items || [];
  const totalCount = urlData.totalItems || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading your URLs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6 flex-1 min-w-0">
              <div className="p-4 bg-blue-600 rounded-xl shadow-sm flex-shrink-0">
                <img src="/logo_only.svg" alt="logo" className="w-16 h-16" />
              </div>
              <div className="text-center lg:text-left min-w-0 flex-1">
                <h1 className="text-2xl lg:text-3xl font-semibold text-white break-words">
                  Welcome to Teeny-Weeny URL!
                </h1>
                <p className="text-slate-400 mt-2 text-base lg:text-lg">
                  The ultimate platform for shortening your URLs with style
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* URLs Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-semibold text-white">
              Your Short URLs
            </h2>
            <div className="flex items-center gap-3 flex-shrink-0">
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
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium text-sm">
                  {totalCount}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400">Error: {error}</p>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-slate-300 font-medium">
                    Short URL
                  </th>
                  <th className="text-left py-4 px-4 text-slate-300 font-medium hidden md:table-cell">
                    Original URL
                  </th>
                  <th className="text-left py-4 px-4 text-slate-300 font-medium hidden sm:table-cell">
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
                  allUrls.map((url, index) => {
                    const urlId = url.id;

                    return (
                      <tr
                        key={urlId || url.shortCode || index}
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
                        <td className="py-4 px-4 hidden md:table-cell">
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
                        <td className="py-4 px-4 hidden sm:table-cell">
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
                          <div className="flex flex-col sm:flex-row gap-2">
                            {urlId ? (
                              <>
                                <Link
                                  to="/edit-url/$id"
                                  params={{ id: String(urlId) }}
                                  className="bg-blue-500/10 text-blue-300 px-3 py-1 rounded-lg hover:bg-blue-500/20 transition-all duration-200 text-sm text-center"
                                >
                                  Edit
                                </Link>
                                <Link
                                  to="/short-urls/$id"
                                  params={{ id: String(urlId) }}
                                  className="bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-lg hover:bg-emerald-500/20 transition-all duration-200 text-sm text-center"
                                >
                                  Info
                                </Link>
                                <button
                                  onClick={() =>
                                    handleDelete(urlId, url.shortCode)
                                  }
                                  disabled={deletingId === urlId}
                                  className="bg-red-500/10 text-red-300 px-3 py-1 rounded-lg hover:bg-red-500/20 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed text-center"
                                >
                                  {deletingId === urlId
                                    ? "Deleting..."
                                    : "Delete"}
                                </button>
                              </>
                            ) : (
                              <span className="text-slate-400 text-sm">
                                Loading...
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
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
