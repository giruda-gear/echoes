import SideBar from "~/\bcomponents/layout/Sidebar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="flex w-80 bg-white">
        <SideBar />
        <nav className="flex-1 overflow-y-auto">
          <div>memo list</div>
          <div>memo list</div>
          <div>memo list</div>
          <div>memo list</div>
          <div>memo list</div>
          <div>memo list</div>
          <div>memo list</div>
        </nav>
      </aside>
      <main className="flex-1">outlet</main>
    </div>
  );
}
