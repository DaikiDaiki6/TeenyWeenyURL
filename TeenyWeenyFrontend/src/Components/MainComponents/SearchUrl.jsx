export default function SearchUrl() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search short code here..."
        className="w-full h-12 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className="w-5 h-5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}
