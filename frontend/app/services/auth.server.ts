import { redirect } from "react-router"
import { API_URL } from "~/config.server"

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error("login failed")
  }

  return response.json()
}

export async function verifyToken(token: string) {
  const response = await fetch(`${API_URL}/auth/verify-token`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.status === 401) {
    throw redirect("/login")
  }

  if (!response.ok) {
    throw new Error("Failed to verify token")
  }

  return response.json()
}
