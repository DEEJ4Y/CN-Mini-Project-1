import axios from "axios";
import { apiUrl } from "./index";

export const getUserById = async (userId: string, token: string) => {
  try {
    const res = await axios.get(`${apiUrl}/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!res) throw new Error("Signup failed.");

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};
