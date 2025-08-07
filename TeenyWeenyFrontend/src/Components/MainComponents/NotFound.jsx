export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-semibold text-white">
            Oops! 404
          </h1>
          <p className="text-xl text-slate-300">
            Well... That's embarrassing... We don't have this path file
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-xl">
          <img
            src="idk.gif"
            alt="not_found"
            className="w-full max-w-md mx-auto rounded-lg shadow-sm"
          />
        </div>

        <div className="space-y-4">
          <p className="text-slate-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}
