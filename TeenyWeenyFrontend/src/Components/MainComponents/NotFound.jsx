export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Oops! 404
          </h1>
          <p className="text-xl text-gray-300">
            Well... That's embarrassing... We don't have this path file
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          <img
            src="idk.gif"
            alt="not_found"
            className="w-full max-w-md mx-auto rounded-xl shadow-lg"
          />
        </div>

        <div className="space-y-4">
          <p className="text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}
