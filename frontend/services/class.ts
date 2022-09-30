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

export const classDataValueTypeToInputType = {
  Number: "number",
  Text: "text",
};

export const classDataValueTypeToDefault = {
  Number: 0,
  Text: "",
};

export const classDataValueTypeToValidator = {
  Number: (n: any) => !isNaN(n),
  Text: (s: string) => s.length > 0,
};

export interface ClassDataResponse {
  _id: string;
  classId: string;
  userId: string;
  fieldId: string;
  value: string;
}

export interface ClassDataWithUserResponse {
  _id: string;
  classId: string;
  key: string;
  valueType: "Number" | "Text";
  userResponseDocument: ClassDataResponse | undefined;
  userResponseValue: string;
}

export interface ConsolidatedClassData extends ClassData {
  responses: ClassDataResponse[];
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

export const getDataFieldById = async (token: string, dataFieldId: string) => {
  if (!token || !dataFieldId) return null;

  try {
    const res = await axios.get(`${apiUrl}/datafields/${dataFieldId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (!res) throw new Error("Failed to get data field");

    if (res.data.error) throw new Error(res.data.error);

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};

export const createDataFieldResponse = async (
  token: string,
  data: ClassDataResponse
) => {
  if (!token || !data || !data.classId || !data.fieldId || !data.value)
    return null;

  try {
    const res = await axios.post(`${apiUrl}/responses`, data, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (!res) throw new Error("Failed to create data field response");

    if (res.data.error) throw new Error(res.data.error);

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};

export const getDataFieldResponse = async (token: string, id: string) => {
  if (!token || !id) return null;

  try {
    const res = await axios.get(`${apiUrl}/responses/${id}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    console.log(res);

    if (!res) throw new Error("Failed to get data field response");

    if (res.data.error) throw new Error(res.data.error);

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};

export const editDataFieldResponse = async (
  token: string,
  id: string,
  data: ClassDataResponse
) => {
  if (!token || !id || !data || !data.value) return null;

  try {
    const res = await axios.put(`${apiUrl}/responses/${id}`, data, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (!res) throw new Error("Failed to create data field response");

    if (res.data.error) throw new Error(res.data.error);

    return res.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};
