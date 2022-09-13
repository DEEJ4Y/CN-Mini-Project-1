import axios from "axios";
import { apiUrl } from "./index";

export interface User {
  name: string;
  createdAt: Date;
  email: string;
  _id: string;
}

export const getLoggedInUser = async (token: string) => {
  if (!token) return null;

  try {
    const res = await axios.get(`${apiUrl}/auth/me`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!res) throw new Error("Failed to get user data.");

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};
