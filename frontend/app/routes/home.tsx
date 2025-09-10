import type { Route } from "./+types/home"

import Navbar from "~/components/layout/Navbar"
import SidebarHeader from "~/components/layout/SidebarHeader"
import DiaryCotent from "~/components/diary/DiaryContent"
import DiaryHeader from "~/components/diary/DiaryHeader"

import { useLoaderData } from "react-router"
import { getDiaries } from "~/api/diary"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "echoes" },
    { name: "description", content: "Welcome to echoes diary!" },
  ]
}

export async function loader() {
  const diaries = await getDiaries()
  return { diaries }
}

export default function Home() {
  const { diaries } = useLoaderData<typeof loader>()

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="flex w-80 flex-col border-r border-gray-200 bg-white">
        <SidebarHeader />
        <Navbar diaries={diaries} />
      </aside>
      <main className="flex flex-1 flex-col">
        <DiaryHeader />
        <DiaryCotent />
      </main>
    </div>
  )
}
