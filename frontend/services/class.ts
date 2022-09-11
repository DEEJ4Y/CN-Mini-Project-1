import axios from "axios";
import { apiUrl } from "./index";
import { User } from "./user";

export interface Class {
  _id: string;
  name: string;
  description: string;
  teachers: User[];
  students: User[];
  createdAt: Date;
  updatedAt: Date;
}

export const getAllTeachingClasses = async (token: string) => {
  try {
    const res = await axios.get(`${apiUrl}/classes/teacher`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (!res) throw new Error("Failed to get teaching classes.");

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};

export const createClass = async (token: string, data: Class) => {
  try {
    const res = await axios.post(`${apiUrl}/classes`, data, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (!res) throw new Error("Failed to create a class.");

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};

export const getClassById = async (token: string, classId: string) => {
  try {
    const res = await axios.get(`${apiUrl}/classes/${classId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (!res) throw new Error("Failed to get a class with id of " + classId);

    if (res.data.error) throw new Error(res.data.error);

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};
