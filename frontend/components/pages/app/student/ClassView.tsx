import { Title, Text, Loader, TextInput } from "@mantine/core";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {
  Class,
  ClassData,
  ClassDataResponse,
  getClassById,
} from "../../../../services/class";
import useAuth from "../../../Auth";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { stringIsEmpty } from "../../../../utils/validate";

export const getFieldDataById = (
  fieldData: ClassData[],
  fieldDataId: string
) => {
  return fieldData.find((data: ClassData) => {
    if (data._id === fieldDataId) {
      return true;
    }

    return false;
  });
};

export default function StudentClassViewComponent() {
  const router = useRouter();
  const { getUserToken } = useAuth();
  const [classId, setClassId] = useState<null | string>(null);

  useEffect(() => {
    if (!classId) {
      const _classId = router.query.c;

      if (_classId) {
        setClassId(() => _classId as string);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const { isLoading, isError, data } = useQuery(
    ["student", "class", classId],
    () => getClassById(getUserToken() as string, classId as string)
  );

  const userResponses: ClassDataResponse[] =
    data?.data?.dataFieldResponses || [];
  const dataFields: ClassData[] = data?.data?.dataFields || [];
  let dataFieldsObj: any = {};
  let dataFieldValidators: any = {};

  dataFields.forEach(({ key, valueType }: ClassData) => {
    if (valueType === "Number") {
      dataFieldsObj[key] = 0;
      dataFieldValidators[key] = (v: any) =>
        isNaN(v) ? "Please enter a valid " + key : null;
    } else if (valueType === "Text") {
      dataFieldsObj[key] = "";
      dataFieldValidators[key] = (v: any) =>
        stringIsEmpty(v) || v === undefined || v === null
          ? "Please enter a valid " + key
          : null;
    }
  });

  userResponses.forEach(({}: ClassDataResponse) => {});

  const form = useForm({
    initialValues: {
      ...dataFieldsObj,
    },
    validate: {
      ...dataFieldValidators,
    },
  });

  if (isLoading) {
    return (
      <>
        <Title>My Class</Title>
        <Text>Please wait while your class loads.</Text>
        <Loader />
      </>
    );
  }

  if (isError || !data) {
    return (
      <>
        <Title>Oops!</Title>
        <Text color="red">There was an error while loading the class.</Text>
      </>
    );
  }

  console.log(data.data, form.values);

  const _class = data.data as Class;
  return (
    <form onBlur={form.validate}>
      <div>
        <Title>{_class.name}</Title>
        <Text>
          Teacher{_class.teachers.length > 1 ? "s" : ""}:{" "}
          {_class.teachers.map(({ name }) => name).join(", ")}
        </Text>
        <Text mt="md">
          Your teacher has requested the following data from you:{" "}
        </Text>
        {dataFields.map((dataField: ClassData) => {
          let type = "text";
          if (dataField.valueType === "Number") {
            type = "number";
          }

          return (
            <TextInput
              {...form.getInputProps(dataField.key)}
              mt="sm"
              label={dataField.key}
              key={`response-${dataField._id}`}
              type={type}
            />
          );
        })}
      </div>
    </form>
  );
}
