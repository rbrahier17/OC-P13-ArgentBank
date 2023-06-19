// signIn.ts

import baseUrl from "../baseUrl";

/**
 * Authenticates a user with the provided credentials and return auth token if success.
 */
export default async function signIn(credentials: { email: string; password: string }) {
  try {
    const response = await fetch(baseUrl + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      return data.body.token;
    } else {
      if (response.status === 400) {
        throw new Error("Incorrect credentials");
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
