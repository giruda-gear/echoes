import {
  createCookieSessionStorage,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router"
import { refreshAccessToken } from "~/services/auth.server"

type AuthHandlerArgs<Context = unknown> = (
  | LoaderFunctionArgs<Context>
  | ActionFunctionArgs<Context>
) & {
  accessToken: string
  headers?: Record<string, string>
}

type AuthHandler = (args: AuthHandlerArgs) => Promise<any>

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
  let refreshToken = session?.get("refreshToken")
  let tokenRefreshed = false

  if (!accessToken && !refreshToken) {
    throw redirect("/login")
  }

  if (!accessToken || isTokenExpired(accessToken)) {
    if (!refreshToken) {
      throw redirect("/login")
    }

    try {
      const newTokens = await refreshAccessToken(refreshToken)
      accessToken = newTokens.access_token
      refreshToken = newTokens.refresh_token
      session.set("accessToken", newTokens.accessToken)
      session.set("refreshToken", newTokens.refreshToken)
      tokenRefreshed = true
    } catch (err) {
      console.error("Token refresh failed:", err)
      throw redirect("/login")
    }
  }

  return { accessToken, session, tokenRefreshed }
}

function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return Date.now() >= payload.exp * 1000
  } catch {
    return true
  }
}

export const withAuth =
  (handler: AuthHandler) =>
  async (args: LoaderFunctionArgs | ActionFunctionArgs) => {
    const { accessToken, session, tokenRefreshed } = await getUserToken(
      args.request,
    )

    const headers: Record<string, string> = {}
    if (tokenRefreshed) headers["Set-Cookie"] = await commitSession(session)

    try {
      return await handler({ ...args, accessToken, headers })
    } catch (error) {
      console.error("Auth error:", error)
      throw redirect("/login")
    }
  }
