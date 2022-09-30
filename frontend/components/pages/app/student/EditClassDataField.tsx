import { Title, Text, Loader, TextInput, Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { NextRouter, useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import {
  ClassData,
  classDataValueTypeToDefault,
  classDataValueTypeToValidator,
  createDataFieldResponse,
  editDataFieldResponse,
  getDataFieldById,
  getDataFieldResponse,
} from "../../../../services/class";
import useAuth from "../../../Auth";
import {
  classDataValueTypeToInputType,
  ClassDataResponse,
} from "../../../../services/class";
import e from "express";
import { queryClient } from "../../../../pages/_app";

export default function EditClassDataField() {
  const router = useRouter();
  const { getUserToken } = useAuth();
  const [classDataResponse, setClassDataResponse] = useState<any>(null);

  useEffect(() => {
    if (router.isReady) {
      const classId = router.query.c;
      const dataFieldId = router.query.d;
      const existingUserResponse = router.query.r;
      const userResponseId = router.query.ur;

      if (
        !classId ||
        !dataFieldId ||
        !existingUserResponse ||
        !userResponseId
      ) {
        router.push("/app/student/classes");
      }

      setClassDataResponse(() => {
        if (existingUserResponse === "true" && userResponseId?.length !== 0) {
          return {
            classId,
            fieldId: dataFieldId,
            hasResponse: true,
            responseId: userResponseId,
          };
        }
        return {
          classId,
          fieldId: dataFieldId,
          hasResponse: false,
        };
      });

      router.prefetch("/app/students/classes/view");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const fieldDataQuery = useQuery(
    ["student", "class", "dataField", classDataResponse?.fieldId],
    () =>
      getDataFieldById(
        getUserToken() as string,
        classDataResponse?.fieldId as string
      )
  );

  if (fieldDataQuery.isLoading) {
    return (
      <>
        <Title>My Class</Title>
        <Text>Please wait while the field loads.</Text>
        <Loader />
      </>
    );
  }

  if (
    fieldDataQuery.isError ||
    !fieldDataQuery.data ||
    fieldDataQuery.data.data?.classId !== classDataResponse.classId
  ) {
    return (
      <>
        <Title>Oops!</Title>
        <Text color="red">There was an error while loading the field.</Text>
      </>
    );
  }

  if (!classDataResponse.hasResponse) {
    return <NewResponse fieldData={fieldDataQuery.data.data} />;
  }

  return (
    <EditResponse
      fieldData={fieldDataQuery.data.data}
      responseId={classDataResponse.responseId}
    />
  );
}

export function NewResponse({ fieldData }: { fieldData: ClassData }) {
  const { _id, key, valueType, classId } = fieldData;
  const type = classDataValueTypeToInputType[valueType];
  const validator = classDataValueTypeToValidator[valueType];

  const { getUserToken } = useAuth();
  const router = useRouter();
  const [value, setValue] = useState(classDataValueTypeToDefault[valueType]);
  const [error, setError] = useState<string | false>(
    "Please make a valid entry."
  );
  const [formError, setFormError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createDataFieldResponse(
      getUserToken() as string,
      {
        classId,
        value,
        fieldId: _id,
      } as ClassDataResponse
    );

    if (!res) {
      setFormError(() => "Failed to update your data");
      return;
    }

    queryClient.invalidateQueries(["student", "class", classId]);

    router.push(`/app/student/classes/view?c=${classId}`, {
      query: { c: classId },
    });
  };

  return (
    <>
      <Title mb="md">New response</Title>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextInput
          label={key}
          type={type}
          value={value}
          onChange={(e) => {
            const _value = e.currentTarget.value;
            const validated = validator(_value);

            if (!validated) setError("Please make a valid entry.");
            else setError(false);

            setValue(() => _value);
          }}
          error={error}
          mb="md"
        />
        <Text color="red">{formError}</Text>
        <Button disabled={Boolean(error)} type="submit">
          Save
        </Button>
      </form>
    </>
  );
}

export function EditResponse({
  fieldData,
  responseId,
}: {
  fieldData: ClassData;
  responseId: string;
}) {
  const { _id, key, valueType, classId } = fieldData;

  const type = classDataValueTypeToInputType[valueType];
  const validator = classDataValueTypeToValidator[valueType];

  const { getUserToken } = useAuth();
  const router = useRouter();
  const { isLoading, isError, data } = useQuery(
    ["student", "class", classId, "datafieldresponse", responseId],
    () => getDataFieldResponse(getUserToken() as string, responseId)
  );

  const [value, setValue] = useState(classDataValueTypeToDefault[valueType]);
  const [isValueSet, setIsValueSet] = useState(false);
  const [error, setError] = useState<string | false>(false);
  const [formError, setFormError] = useState("");

  if (isLoading) {
    return (
      <>
        <Title>My Class</Title>
        <Text>Please wait while the field loads.</Text>
        <Loader />
      </>
    );
  }

  if (isError || !data) {
    return (
      <>
        <Title>Oops!</Title>
        <Text color="red">There was an error while loading the field.</Text>
      </>
    );
  }

  if (!isValueSet && data?.data?.value && value !== data?.data?.value) {
    setValue(data.data.value);
    setIsValueSet(true);
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await editDataFieldResponse(
      getUserToken() as string,
      responseId,
      {
        classId,
        value,
        fieldId: _id,
      } as ClassDataResponse
    );

    if (!res) {
      setFormError(() => "Failed to update your data");
      return;
    }

    queryClient.invalidateQueries(["student", "class", classId]);
    router.push(`/app/student/classes/view?c=${classId}`, {
      query: { c: classId },
    });
  };

  return (
    <>
      <Title mb="md">Edit response</Title>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextInput
          label={key}
          type={type}
          value={value}
          onChange={(e) => {
            const _value = e.currentTarget.value;
            const validated = validator(_value);

            if (!validated) setError("Please make a valid entry.");
            else setError(false);

            setValue(() => _value);
          }}
          error={error}
          mb="md"
        />
        <Text color="red">{formError}</Text>
        <Button disabled={Boolean(error)} type="submit">
          Save
        </Button>
      </form>
    </>
  );
}
