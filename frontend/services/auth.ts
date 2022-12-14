import axios from "axios";
import { apiUrl } from "./index";

export const signupService = async (data: object) => {
  if (!data) return null;
  try {
    const res = await axios.post(`${apiUrl}/api/v1/auth/register`, data);

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
  if (!data) return null;

  try {
    const res = await axios.post(`${apiUrl}/api/v1/auth/login`, data);

    if (!res) throw new Error("Login failed.");

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return error;
  }
};

export const getMeService = async (token: string) => {
  if (!token) return null;
  try {
    const res = await axios.get(`${apiUrl}/api/v1/auth/me`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (!res) throw new Error("Failed to get user data.");

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return error;
  }
};
