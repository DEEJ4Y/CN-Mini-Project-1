import { Title, Text } from "@mantine/core";
import type { NextPage } from "next";
import CustomAppShell from "../../../components/AppShell";
import AllStudentClasses from "../../../components/pages/app/student/AllClasses";

const ClassesImInPage: NextPage = () => {
  return (
    <CustomAppShell>
      <Title>My Classes</Title>
      <Text>Below is a list of classes you are a part of.</Text>
      <AllStudentClasses />
    </CustomAppShell>
  );
};

export default ClassesImInPage;
