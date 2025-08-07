import { Link } from "@tanstack/react-router";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="p-4 bg-blue-600 rounded-xl shadow-sm">
                <img src="logo_only.svg" alt="profile" className="w-20 h-20" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-white">Daiki</h1>
              <p className="text-slate-400 mt-1">URL Shortener Enthusiast</p>
            </div>
          </div>
        </div>

        {/* URLs Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Your Short URLs
            </h2>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">1</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-slate-300 font-medium">
                    Short URL
                  </th>
                  <th className="text-left py-4 px-4 text-slate-300 font-medium">
                    Original URL
                  </th>
                  <th className="text-left py-4 px-4 text-slate-300 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                  <td className="py-4 px-4">
                    <span className="text-blue-400 font-mono bg-blue-500/10 px-3 py-1 rounded-lg">
                      https://twurl.com/daikii
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-300 truncate block max-w-xs">
                      https://www.youtube.com/watch?v=fri_S6b5Ntc
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <Link
                        to="/edit-url"
                        className="bg-blue-500/10 text-blue-300 px-3 py-1 rounded-lg hover:bg-blue-500/20 transition-all duration-200 text-sm"
                      >
                        Edit
                      </Link>
                      <Link
                        to="/short-urls"
                        className="bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-lg hover:bg-emerald-500/20 transition-all duration-200 text-sm"
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
