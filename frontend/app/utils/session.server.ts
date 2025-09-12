import { createCookieSessionStorage, redirect } from "react-router"

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.SESSION_SECRET!],
    maxAge: 60 * 60 * 24,
  },
})

export const { getSession, commitSession, destroySession } = sessionStorage

export async function requireUserToken(request: Request) {
  const session = await getSession(request.headers.get("Cookie"))
  const token = session.get("accessToken")

  if (!token) {
    throw redirect("/login")
  }

  return token
}
