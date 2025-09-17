import {
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router"
import { getDiaries } from "~/services/diary.server"
import DiaryCotent from "~/components/diary/DiaryContent"
import DiaryHeader from "~/components/diary/DiaryHeader"
import Navbar from "~/components/layout/Navbar"
import SidebarHeader from "~/components/layout/SidebarHeader"
import { getUserToken } from "~/utils/session.server"

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const token = await getUserToken(request)
    const diaries = await getDiaries(token)
    return { diaries }
  } catch (err: unknown) {
    console.error(err)
    return new Response("Internal Server Error", { status: 500 })
  }
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
