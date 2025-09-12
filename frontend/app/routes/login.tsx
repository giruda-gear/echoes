import { Form, redirect, type ActionFunctionArgs } from "react-router"
import { login } from "~/services/auth.server"
import { commitSession, getSession } from "~/utils/session.server"

export async function action({ request }: ActionFunctionArgs) {
  try {
    const form = await request.formData()
    const email = form.get("email") as string
    const password = form.get("password") as string

    const { access_token } = await login(email, password)

    if (!access_token) {
      return redirect("/login")
    }

    const session = await getSession(request.headers.get("Cookie"))
    session.set("accessToken", access_token)

    return redirect("/diary", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    })
  } catch (err) {
    console.error(err)
    return redirect("/login")
  }
}

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-pink-50 p-8">
      <div className="w-full max-w-md rounded-lg bg-gray-50 p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-700">My Diary</h1>
          <p className="text-gray-400">Login to access your personal diary</p>
        </div>

        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2"
              placeholder="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2"
              placeholder="password"
            />
          </div>

          <button className="w-full rounded-2xl bg-purple-300 px-4 py-3 text-white hover:bg-purple-400">
            Login
          </button>
        </Form>
      </div>
    </div>
  )
}
