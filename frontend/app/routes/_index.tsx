import { type MetaFunction } from "react-router"

export function meta({}: MetaFunction) {
  return [
    { title: "echoes" },
    { name: "description", content: "Welcome to echoes diary!" },
  ]
}

export default function Home() {
  return <div>home</div>
}
