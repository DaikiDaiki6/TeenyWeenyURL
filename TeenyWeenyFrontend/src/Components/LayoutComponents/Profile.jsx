import { Link } from "@tanstack/react-router";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                <img src="logo_only.svg" alt="profile" className="w-20 h-20" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Daiki
              </h1>
              <p className="text-gray-300 mt-1">URL Shortener Enthusiast</p>
            </div>
          </div>
        </div>

        {/* URLs Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Your Short URLs</h2>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">1</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-4 text-purple-300 font-semibold">
                    Short URL
                  </th>
                  <th className="text-left py-4 px-4 text-purple-300 font-semibold">
                    Original URL
                  </th>
                  <th className="text-left py-4 px-4 text-purple-300 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors duration-300">
                  <td className="py-4 px-4">
                    <span className="text-purple-400 font-mono bg-purple-500/20 px-3 py-1 rounded-lg">
                      https://twurl.com/daikii
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-300 truncate block max-w-xs">
                      https://www.youtube.com/watch?v=fri_S6b5Ntc
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <Link
                        to="/edit-url"
                        className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg hover:bg-blue-500/30 transition-all duration-300 text-sm"
                      >
                        Edit
                      </Link>
                      <Link
                        to="/short-urls"
                        className="bg-green-500/20 text-green-300 px-3 py-1 rounded-lg hover:bg-green-500/30 transition-all duration-300 text-sm"
                      >
                        Info
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
