import { Title, Text, Loader, Button, Table } from "@mantine/core";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {
  Class,
  ClassData,
  getClassById,
  ClassDataResponse,
} from "../../../../services/class";
import useAuth from "../../../Auth";
import { useEffect, useState } from "react";
import { FilePlus, UserPlus } from "tabler-icons-react";
import Link from "next/link";
import { User } from "../../../../services/user";

export default function TeacherClassView() {
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
    ["teacher", "class", classId],
    () => getClassById(getUserToken() as string, classId as string)
  );

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

  // console.log(data.data);

  const _class = data.data as Class;
  return (
    <>
      <Title>{_class.name}</Title>
      <Text>{_class.description}</Text>
      <Text>
        Teacher{_class.teachers.length > 1 ? "s" : ""}:{" "}
        {_class.teachers.map(({ name }) => name).join(", ")}
      </Text>

      <Link
        passHref
        href={`/app/teacher/classes/invite/student?c=${_class._id}`}
      >
        <Button variant="outline" mt="sm" leftIcon={<UserPlus size={20} />}>
          Invite Student
        </Button>
      </Link>

      <Title mt="lg" order={2}>
        Students
      </Title>
      <Text mb="xs">
        Total:
        <span style={{ fontWeight: "lighter" }}> {_class.students.length}</span>
      </Text>

      <Link passHref href={`/app/teacher/classes/add-field?c=${_class._id}`}>
        <Button leftIcon={<FilePlus size={20} />}>Add Field</Button>
      </Link>

      {_class.students.length > 0 ? (
        <Table horizontalSpacing="xs">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              {_class.dataFields.map(({ _id, key }: ClassData) => (
                <th key={_id}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {_class.students.map(({ name, _id, email }: User) => (
              <tr key={`row-${_id}`}>
                <td>{name}</td>
                <td>{email}</td>
                {_class.dataFields.map((classData: ClassData) => {
                  const found = _class.dataFieldResponses.find(
                    ({ fieldId, userId }: ClassDataResponse) => {
                      if (fieldId === classData._id && userId === _id) {
                        return true;
                      }

                      return false;
                    }
                  );

                  if (found) {
                    console.log(found);
                    return <td key={found._id}>{found.value}</td>;
                  }

                  return <td key={_id + classData._id}>-</td>;
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Text>There are currently no students in this class.</Text>
      )}
    </>
  );
}
