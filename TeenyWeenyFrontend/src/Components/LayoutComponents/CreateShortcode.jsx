import { useState, useEffect } from "react";
import { ShortUrlsService, AuthService } from "../Api/services";

export default function CreateShortcode() {
  const [formData, setFormData] = useState({
    originalUrl: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [createdUrl, setCreatedUrl] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setUserLoading(true);
        const response = await AuthService.authCheck();
        setUserId(parseInt(response.data.userId));
      } catch (e) {
        console.error("Error fetching user info:", e);
        setError("Failed to get user information");
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.originalUrl.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateUrl(formData.originalUrl)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    if (!userId) {
      setError("User information not available. Please refresh the page.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const requestData = {
        originalUrl: formData.originalUrl,
        note: formData.note || null,
        userId: userId,
      };

      console.log("Creating short URL with data:", requestData);
      const response = await ShortUrlsService.createUrl(requestData);

      console.log("Create URL response:", response.data);

      // Extract short code from response
      let shortCode = null;
      if (response.data.shortUrl) {
        // If response contains full URL like "https://twurl.com/abc123"
        const urlParts = response.data.shortUrl.split("/");
        shortCode = urlParts[urlParts.length - 1];
      } else if (response.data.shortCode) {
        // If response contains just the short code
        shortCode = response.data.shortCode;
      }

      setCreatedUrl({
        shortCode: shortCode,
        fullUrl: `http://localhost:5140/${shortCode}`,
        originalUrl: formData.originalUrl,
        note: formData.note,
      });

      setSuccess("Short URL created successfully!");

      // Reset form
      setFormData({
        originalUrl: "",
        note: "",
      });
    } catch (e) {
      console.error("Error creating short URL:", e);
      setError(
        e.response?.data?.message || e.message || "Failed to create short URL"
      );
    } finally {
      setLoading(false);
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

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        alert("Copied to clipboard!");
      } catch (err) {
        console.error("Fallback copy failed:", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const createAnother = () => {
    setCreatedUrl(null);
    setSuccess(null);
    setError(null);
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
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
              <h1 className="text-3xl font-semibold text-white">
                Create Short URL
              </h1>
              <p className="text-slate-400 mt-2 text-lg">
                Transform your long URLs into short, shareable links
              </p>
            </div>
          </div>
        </div>

        {/* Success Display */}
        {createdUrl && (
          <div className="bg-emerald-500/10 backdrop-blur-md rounded-xl border border-emerald-500/20 p-8 shadow-xl">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-emerald-300">
                Short URL Created Successfully!
              </h2>

              <div className="bg-white/5 rounded-lg p-4 space-y-3">
                <div>
                  <label className="block text-slate-400 text-sm mb-1">
                    Your Short URL:
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <a
                        href={createdUrl.fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 font-mono hover:text-blue-200 transition-colors"
                      >
                        {createdUrl.fullUrl}
                      </a>
                    </div>
                    <button
                      onClick={() => copyToClipboard(createdUrl.fullUrl)}
                      className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
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
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-1">
                    Original URL:
                  </label>
                  <div className="bg-slate-500/10 border border-slate-500/20 rounded-lg p-3">
                    <span className="text-slate-300 break-all">
                      {createdUrl.originalUrl}
                    </span>
                  </div>
                </div>

                {createdUrl.note && (
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">
                      Note:
                    </label>
                    <div className="bg-slate-500/10 border border-slate-500/20 rounded-lg p-3">
                      <span className="text-slate-300">{createdUrl.note}</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={createAnother}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Create Another URL
              </button>
            </div>
          </div>
        )}

        {/* Create Form */}
        {!createdUrl && (
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Original URL *
                </label>
                <input
                  type="url"
                  name="originalUrl"
                  value={formData.originalUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/your-very-long-url"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  required
                />
                <p className="text-slate-400 text-xs mt-1">
                  Enter the URL you want to shorten (must include http:// or
                  https://)
                </p>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Note (Optional)
                </label>
                <input
                  type="text"
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  placeholder="Add a note to remember what this URL is for"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  maxLength={200}
                />
                <p className="text-slate-400 text-xs mt-1">
                  Optional note to help you remember what this URL is for
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

              {!userId && !userLoading && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-yellow-400 text-sm">
                    Loading user information...
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !userId}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
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
                    Creating Short URL...
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
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    Create Short URL
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Features Info */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
            <p className="text-slate-400 text-sm">
              Create short URLs instantly with our optimized system
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Track Clicks</h3>
            <p className="text-slate-400 text-sm">
              Monitor how many people click on your shortened links
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Add Notes</h3>
            <p className="text-slate-400 text-sm">
              Keep track of your URLs with custom notes and descriptions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
