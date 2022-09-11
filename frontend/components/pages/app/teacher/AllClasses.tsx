import { Grid, Loader, Text, Button, Paper } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getAllTeachingClasses, Class } from "../../../../services/class";
import useAuth from "../../../Auth";

export default function AllTeacherClasses() {
  const { getUserToken } = useAuth();
  const { isLoading, isError, data } = useQuery(["teacher", "classes"], () =>
    getAllTeachingClasses(getUserToken() as string)
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Text color="red">
        Failed to get your classes. Please try again later.
      </Text>
    );
  }

  const classes = data?.data;
  const noClasses = classes?.length === 0;

  if (noClasses) {
    return (
      <div>
        <Link passHref href="/app/teacher/classes/create">
          <Button variant="gradient" mt="sm">
            Create a class
          </Button>
        </Link>
        <Text>
          You do not have any classes at the moment. Create a classroom to start
          managing.
        </Text>
      </div>
    );
  }

  return (
    <div>
      <Link passHref href="/app/teacher/classes/create">
        <Button variant="gradient" my="sm">
          Create a class
        </Button>
      </Link>
      <Grid>
        {classes?.map((_class: Class, idx: number) => (
          <Grid.Col key={`teacher-class-card-${idx}`} xl={4} md={6} sm={12}>
            <Link passHref href={`/app/teacher/classes/view?c=${_class._id}`}>
              <Paper withBorder p="md" style={{ height: "100%" }}>
                <Text weight={500}>{_class.name}</Text>
                <Text color="dimmed">{_class.description}</Text>
              </Paper>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
