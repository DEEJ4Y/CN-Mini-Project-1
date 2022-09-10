import axios from "axios";
import { apiUrl } from "./index";

export const signupService = async (data: object) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/register`, data);

    if (!res) throw new Error("Signup failed.");

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};

export const loginService = async (data: object) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, data);

    if (!res) throw new Error("Login failed.");

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};
