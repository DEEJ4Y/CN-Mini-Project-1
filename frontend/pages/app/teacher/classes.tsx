import { Title, Text } from "@mantine/core";
import type { NextPage } from "next";
import CustomAppShell from "../../../components/AppShell";
import AllTeacherClasses from "../../../components/pages/app/teacher/AllClasses";

const ClassesITeachPage: NextPage = () => {
  return (
    <CustomAppShell>
      <Title>My Classes</Title>
      <Text>Below is a list of classes you teach.</Text>
      <AllTeacherClasses />
    </CustomAppShell>
  );
};

export default ClassesITeachPage;
