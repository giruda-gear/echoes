import { API_URL } from "~/config.server"

export async function createDiary(token: string) {
  const response = await fetch(`${API_URL}/diaries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to create diary")
  }

  return response.json()
}

export async function getDiaries(token: string) {
  const response = await fetch(`${API_URL}/diaries`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  
  if (!response.ok) {
    throw new Error("Failed to fetch diaries")
  }

  return response.json()
}
