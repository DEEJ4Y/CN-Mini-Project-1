import { Grid, Loader, Text, Paper } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Class, getAllStudentClasses } from "../../../../services/class";
import useAuth from "../../../Auth";

export default function AllStudentClasses() {
  const { getUserToken } = useAuth();
  const { isLoading, isError, data } = useQuery(["student", "classes"], () =>
    getAllStudentClasses(getUserToken() as string)
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
        <Text>
          You are not part of any classes at the moment. Ask your teacher to
          share a joining link with you.
        </Text>
      </div>
    );
  }

  return (
    <div>
      <Grid mt="md">
        {classes?.map((_class: Class, idx: number) => (
          <Grid.Col key={`student-class-card-${idx}`} xl={4} md={6} sm={12}>
            <Link passHref href={`/app/student/classes/view?c=${_class._id}`}>
              <Paper withBorder p="md" style={{ height: "100%" }}>
                <Text weight={500}>{_class.name}</Text>
              </Paper>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
