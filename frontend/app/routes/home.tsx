import SideBar from "~/components/layout/SidebarHeader";
import type { Route } from "./+types/home";
import NavBar from "~/\bcomponents/layout/Navbar";
import DiaryHeader from "~/\bcomponents/diary/DiaryHeader";
import DiaryCotent from "~/\bcomponents/diary/DiaryContent";
import SidebarHeader from "~/components/layout/SidebarHeader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "echoes" },
    { name: "description", content: "Welcome to echoes diary!" },
  ];
}

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="flex w-80 flex-col border-r border-gray-200 bg-white">
        <SidebarHeader />
        <NavBar />
      </aside>
      <main className="flex flex-1 flex-col">
        <DiaryHeader />
        <DiaryCotent />
      </main>
    </div>
  );
}
