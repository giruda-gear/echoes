import { useLoaderData, type ActionFunctionArgs } from "react-router"
import { getDiaries } from "~/services/diary.server"
import DiaryCotent from "~/components/diary/DiaryContent"
import DiaryHeader from "~/components/diary/DiaryHeader"
import Navbar from "~/components/layout/Navbar"
import SidebarHeader from "~/components/layout/SidebarHeader"

export async function loader({ request }: ActionFunctionArgs) {
  const diaries = await getDiaries(request)
  return { diaries }
}

export default function Diary() {
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
