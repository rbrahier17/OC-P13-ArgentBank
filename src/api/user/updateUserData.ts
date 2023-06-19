// updateUserData.ts

import baseUrl from "../baseUrl";

/**
 * Update user data (first name and last name) providing the auth token.
 */
export default async function updateUserData(token: string, updatedUser: { firstName: string; lastName: string }) {
  try {
    const response = await fetch(baseUrl + "/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    });
    if (response.ok) {
      const data = await response.json();
      return data.body;
    } else {
      if (response.status === 400) {
        throw new Error("Incorrect credentials");
      } else if (response.status === 401) {
        throw new Error("Unauthorized");
      } else if (response.status === 500) {
        throw new Error("Error 500: Server Error");
      } else {
        throw new Error("Unknown Error");
      }
    }
  } catch (error) {
    throw error;
  }
}
