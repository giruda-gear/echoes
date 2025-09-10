type NavbarProps = {
  diaries: { _id: number; content: string }[]
}

export default function Navbar({ diaries }: NavbarProps) {
  return (
    <nav className="flex-1 overflow-y-auto">
      {diaries.map((diary) => (
        <div key={diary._id} className="px-4 py-2 hover:bg-gray-50">
          {diary.content}
        </div>
      ))}
    </nav>
  )
}
