import { Title, Text, Loader, TextInput, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {
  ClassData,
  ClassDataResponse,
  classDataValueTypeToInputType,
  ClassDataWithUserResponse,
  getClassById,
} from "../../../../services/class";
import useAuth from "../../../Auth";
import { useEffect, useState } from "react";
import { User } from "../../../../interfaces/User";
import Link from "next/link";
import { getMeService } from "../../../../services/auth";

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

  const user = useQuery(["user"], () => getMeService(getUserToken() as string));

  if (isLoading || user.isLoading) {
    return (
      <>
        <Title>My Class</Title>
        <Text>Please wait while your class loads.</Text>
        <Loader />
      </>
    );
  }

  if (isError || !data || user.isError || !user?.data) {
    return (
      <>
        <Title>Oops!</Title>
        <Text color="red">There was an error while loading the class.</Text>
      </>
    );
  }

  let { dataFields, dataFieldResponses, name, teachers } = data.data;

  dataFieldResponses = dataFieldResponses.filter(
    (response: ClassDataResponse) => {
      return response.userId === user.data.data._id;
    }
  );

  const dataFieldsWithResponses: ClassDataWithUserResponse[] = dataFields.map(
    (dataField: ClassData) => {
      const userResponseDocument: ClassDataResponse | undefined =
        dataFieldResponses.find(
          (response: ClassDataResponse) => response.fieldId === dataField._id
        );

      const userResponseValue = userResponseDocument
        ? userResponseDocument.value
        : dataField.valueType === "Number"
        ? 0
        : "";

      return {
        ...dataField,
        userResponseDocument,
        userResponseValue,
      };
    }
  );

  // console.log(dataFieldResponses);

  return (
    <div>
      <Title>{name}</Title>

      <Text>
        <strong>Teacher{teachers.length > 1 ? "s" : ""}</strong>:{" "}
        {teachers.map(({ name }: User) => name).join(", ")}
      </Text>

      <Text mb="md">
        Your teacher{teachers.length > 1 ? "s have" : " has"} requested the
        following information from you.{" "}
      </Text>

      {dataFieldsWithResponses.map(
        (
          {
            key,
            valueType,
            _id,
            userResponseDocument,
          }: ClassDataWithUserResponse,
          idx: number
        ) => {
          return (
            <div key={`data-field-${idx}`} style={{ position: "relative" }}>
              {/* c = classId
                  d = data field id
                  r = valid response
                  ur = user response id
                   */}
              <Link
                passHref
                href={`/app/student/classes/edit?c=${
                  router.query.c
                }&d=${_id}&r=${!!userResponseDocument ? true : false}&ur=${
                  userResponseDocument?._id
                }`}
              >
                <Button
                  size="xs"
                  style={{
                    position: "absolute",
                    right: "4px",
                    bottom: "3px",
                    zIndex: 1,
                  }}
                >
                  Edit
                </Button>
              </Link>
              <TextInput
                label={key}
                type={classDataValueTypeToInputType[valueType]}
                mb="sm"
                value={userResponseDocument?.value}
                disabled
              />
            </div>
          );
        }
      )}
    </div>
  );
}
