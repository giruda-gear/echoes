import { createCookieSessionStorage, redirect } from "react-router"
import { refreshAccessToken } from "~/services/auth.server"

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

export async function getUserToken(request: Request) {
  const session = await getSession(request.headers.get("Cookie"))
  let accessToken = session?.get("accessToken")
  const refreshToken = session?.get("refreshToken")

  if (!accessToken && !refreshToken) {
    throw redirect("/login")
  }

  if (!accessToken || isTokenExpired(accessToken)) {
    try {
      const newTokens = await refreshAccessToken(refreshToken)

      if (newTokens.refreshToken) {
        session.set("refreshToken", newTokens.refreshToken)
      }
      session.set("accessToken", newTokens.accessToken)
      await commitSession(session)
    } catch (err) {
      console.error("Token refresh failed:", err)
      throw redirect("/login")
    }
  }

  return accessToken
}

function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return Date.now() >= payload.exp * 1000
  } catch {
    return true
  }
}
