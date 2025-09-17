import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "react-router"
import { verifyToken } from "~/services/auth.server"
import { getUserToken } from "~/utils/session.server"

export function meta({}: MetaFunction) {
  return [
    { title: "echoes" },
    { name: "description", content: "Welcome to echoes diary!" },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const token = await getUserToken(request)
  await verifyToken(token)
  return redirect("/diary")
}

export default function Home() {
  return null
}
