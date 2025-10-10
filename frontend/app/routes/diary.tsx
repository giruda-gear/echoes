import {
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router"
import { createDiary, getDiaries } from "~/services/diary.server"
import DiaryCotent from "~/components/diary/DiaryContent"
import DiaryHeader from "~/components/diary/DiaryHeader"
import Navbar from "~/components/layout/Navbar"
import SidebarHeader from "~/components/layout/SidebarHeader"
import { withAuth } from "~/utils/session.server"
import { useState } from "react"
import type { Diary } from "~/types"

export const loader = withAuth(async ({ accessToken }) => {
  const diaries = await getDiaries(accessToken)
  return { diaries }
})

export const action = withAuth(async ({ accessToken }) => {
  const diary = await createDiary(accessToken)
  return { diary }
})

export const shouldRevalidate = () => false

export default function Diary() {
  const { diaries } = useLoaderData<typeof loader>()
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(
    diaries[0] ?? null,
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="flex w-80 flex-col border-r border-gray-200 bg-white">
        <SidebarHeader />
        <Navbar diaries={diaries} onSelectDiary={setSelectedDiary} />
      </aside>
      <main className="flex flex-1 flex-col">
        <DiaryHeader />
        {selectedDiary && <DiaryCotent diary={selectedDiary} />}
      </main>
    </div>
  )
}
