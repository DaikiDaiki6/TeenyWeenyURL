export default function ShortUrlsProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* URL Details Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              URL Details
            </h1>
            <p className="text-gray-300 mt-2">
              Complete information about your shortened URL
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <label className="text-purple-300 text-sm font-semibold uppercase tracking-wide">
                  Name
                </label>
                <p className="text-white text-lg font-semibold mt-1">Daiki</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <label className="text-purple-300 text-sm font-semibold uppercase tracking-wide">
                  Short URL
                </label>
                <a
                  href="https://twurl.com/daikii"
                  className="text-purple-400 hover:text-purple-300 font-mono text-lg mt-1 block hover:underline transition-colors duration-300"
                >
                  https://twurl.com/daikii
                </a>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <label className="text-purple-300 text-sm font-semibold uppercase tracking-wide">
                  Clicks
                </label>
                <p className="text-white text-lg font-semibold mt-1">255</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <label className="text-purple-300 text-sm font-semibold uppercase tracking-wide">
                  Original URL
                </label>
                <a
                  href="https://www.youtube.com/watch?v=sAW_0KZqmmc"
                  className="text-gray-300 hover:text-white text-lg mt-1 block hover:underline transition-colors duration-300 break-all"
                >
                  https://www.youtube.com/watch?v=sAW_0KZqmmc
                </a>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <label className="text-purple-300 text-sm font-semibold uppercase tracking-wide">
                  Created
                </label>
                <p className="text-white text-lg font-semibold mt-1">
                  May 6, 2003
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <label className="text-purple-300 text-sm font-semibold uppercase tracking-wide">
                  Note (Optional)
                </label>
                <p className="text-gray-300 text-lg mt-1">
                  This is the Short url for a video that I like watching!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-3 px-8 rounded-xl hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/25">
            Delete URL
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
            Edit URL
          </button>
        </div>
      </div>
    </div>
  );
}
