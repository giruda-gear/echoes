import { useFetcher } from "react-router"

export default function SidebarHeader() {
  const fetcher = useFetcher()

  return (
    <header className="border-b border-gray-200 p-3">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">echoes</h1>
        <fetcher.Form method="post">
          <button
            type="submit"
            className="p-2 text-purple-500 hover:bg-purple-50"
          >
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
        </fetcher.Form>
      </div>
      <div className="text-sm text-gray-500">1 diaries</div>
    </header>
  )
}
