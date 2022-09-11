import { Title, Text, Loader, Button, Grid } from "@mantine/core";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Class, getClassById } from "../../../../services/class";
import useAuth from "../../../Auth";
import { useEffect, useState } from "react";
import { UserPlus } from "tabler-icons-react";

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

  console.log(data);

  const _class = data.data as Class;
  return (
    <>
      <Title>{_class.name}</Title>
      <Text>{_class.description}</Text>
      <Text>
        Teacher{_class.teachers.length > 1 ? "s" : ""}:{" "}
        {_class.teachers.map(({ name }) => name).join(", ")}
      </Text>

      <Button variant="gradient" mt="sm" leftIcon={<UserPlus size={20} />}>
        Add Student
      </Button>

      <Grid mt="md">
        <Grid.Col lg={6}>
          <Text weight="bold">Students</Text>
          {_class.students.length > 0 ? (
            <ol>
              {_class.students.map(({ name, _id }) => (
                <li key={`class-${classId}-student-${_id}`}>{name}</li>
              ))}
            </ol>
          ) : (
            <Text>There are currently no students in this class.</Text>
          )}
        </Grid.Col>
      </Grid>
    </>
  );
}
