// getUserData.ts

import baseUrl from "../baseUrl";

/**
 * Retrieves user data from the server providing the auth token.
 */
export default async function getUserData(token: string) {
  try {
    const response = await fetch(baseUrl + "/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = (await response.json()).body;
      return data;
    } else {
      if (response.status === 401) {
        throw new Error("Token error - Unauthorized");
      } else if (response.status === 500) {
        throw new Error("Internal Server Error");
      }
    }
  } catch (error) {
    throw error;
  }
}
