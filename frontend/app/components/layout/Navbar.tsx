import type { Diary } from "~/types"

interface NavbarProps {
  diaries: Diary[]
  onSelectDiary: (diary: Diary) => void
}

export default function Navbar({ diaries, onSelectDiary }: NavbarProps) {
  return (
    <nav className="flex-1 overflow-y-auto">
      {diaries.length > 0 ? (
        diaries.map((diary) => (
          <div
            key={diary._id}
            onClick={() => onSelectDiary(diary)}
            className="px-4 py-2 hover:bg-gray-50"
          >
            {diary.title}
          </div>
        ))
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-center text-gray-400">No Notes</p>
        </div>
      )}
    </nav>
  )
}
