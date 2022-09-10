import { Title, Text } from "@mantine/core";
import type { NextPage } from "next";
import CustomAppShell from "../../../components/AppShell";

const ClassesITeachPage: NextPage = () => {
  return (
    <CustomAppShell>
      <Title>My Classes</Title>
      <Text>Below is a list of classes you teach.</Text>
    </CustomAppShell>
  );
};

export default ClassesITeachPage;
