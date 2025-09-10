export default function SidebarHeader() {
  return (
    <header className="p-3 border-b border-gray-200">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">echoes</h1>
        <button className="p-2 text-purple-500 hover:bg-purple-50">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <div className="text-sm text-gray-500">
        1 diaries
      </div>
    </header>
  );
}
