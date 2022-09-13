import axios from "axios";
import { apiUrl } from "./index";
import { User } from "./user";

export interface Class {
  _id: string;
  name: string;
  description: string;
  teachers: User[];
  students: User[];
  dataFields: ClassData[];
  dataFieldResponses: ClassDataResponse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassData {
  _id: string;
  classId: string;
  key: string;
  valueType: "Number" | "Text";
}

export interface ClassDataResponse {
  _id: string;
  classId: string;
  userId: string;
  fieldId: string;
  value: string;
}

export const getAllTeachingClasses = async (token: string) => {
  if (!token) {
    return null;
  }
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

export const getAllStudentClasses = async (token: string) => {
  if (!token) {
    return null;
  }
  try {
    const res = await axios.get(`${apiUrl}/classes/student`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (!res) throw new Error("Failed to get student classes.");

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};

export const createClass = async (token: string, data: Class) => {
  if (!data || !token) {
    return null;
  }
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
  if (!classId || !token) {
    return null;
  }
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

export const getStudentClassById = async (token: string, classId: string) => {
  if (!classId || !token) {
    return null;
  }
  try {
    const res = await axios.get(`${apiUrl}/classes/${classId}/for-student`, {
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

export const addStudentToClass = async (token: string, classId: string) => {
  if (!classId || !token) {
    return null;
  }
  try {
    const res = await axios.get(`${apiUrl}/classes/${classId}/join-student`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (!res)
      throw new Error("Failed to add student to class with id of " + classId);

    if (res.data.error) throw new Error(res.data.error);

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};

export const addFieldToClass = async (token: string, data: ClassData) => {
  if (!token || !data || !data.classId) return null;

  try {
    const res = await axios.post(`${apiUrl}/datafields`, data, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (!res) throw new Error("Failed to add field to class");

    if (res.data.error) throw new Error(res.data.error);

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};
