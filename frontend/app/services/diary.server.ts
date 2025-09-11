import { API_URL } from "~/config.server"

export async function getDiaries(request: Request) {
  const token = "";
  console.log(token);
  const response = await fetch(`${API_URL}/diaries`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API Error (${response.status}): ${errorText}`)
  }

  return response.json()
}
