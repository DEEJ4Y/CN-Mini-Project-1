import { Title, Text } from "@mantine/core";
import type { NextPage } from "next";
import CustomAppShell from "../../components/AppShell";

const ClassesImInPage: NextPage = () => {
  return (
    <CustomAppShell>
      <Title>Classes I&apos;m in</Title>
      <Text>Below is a list of classes you are a part of.</Text>
    </CustomAppShell>
  );
};

export default ClassesImInPage;
