export default function EditUrl() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8">
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 text-center space-y-6 max-w-md shadow-xl">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-white">Edit URL</h1>
          <p className="text-slate-300">
            This feature is coming soon! You'll be able to edit your shortened
            URLs here.
          </p>
        </div>

        <div className="w-16 h-16 mx-auto bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
          <svg
            className="w-8 h-8 text-white"
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
      </div>
    </div>
  );
}
