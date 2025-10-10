import type { Diary } from "~/types"

interface DiaryContentProps {
  diary: Diary
}

export default function DiaryCotent({ diary }: DiaryContentProps) {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">
        {diary.title}
      </h1>
      <textarea value={diary.content} />
    </section>
  )
}
