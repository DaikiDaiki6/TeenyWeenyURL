export default function ShortUrlsProfile() {
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                  Name
                </label>
                <p className="text-white text-lg font-medium mt-1">Daiki</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                  Short URL
                </label>
                <a
                  href="https://twurl.com/daikii"
                  className="text-blue-400 hover:text-blue-300 font-mono text-lg mt-1 block hover:underline transition-colors duration-200"
                >
                  https://twurl.com/daikii
                </a>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                  Clicks
                </label>
                <p className="text-white text-lg font-medium mt-1">255</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                  Original URL
                </label>
                <a
                  href="https://www.youtube.com/watch?v=sAW_0KZqmmc"
                  className="text-slate-300 hover:text-white text-lg mt-1 block hover:underline transition-colors duration-200 break-all"
                >
                  https://www.youtube.com/watch?v=sAW_0KZqmmc
                </a>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                  Created
                </label>
                <p className="text-white text-lg font-medium mt-1">
                  May 6, 2003
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                  Note (Optional)
                </label>
                <p className="text-slate-300 text-lg mt-1">
                  This is the Short url for a video that I like watching!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-red-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-lg">
            Delete URL
          </button>
          <button className="bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg">
            Edit URL
          </button>
        </div>
      </div>
    </div>
  );
}
