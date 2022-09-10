import { Title, Text } from "@mantine/core";
import type { NextPage } from "next";
import CustomAppShell from "../../../components/AppShell";

const ClassesImInPage: NextPage = () => {
  return (
    <CustomAppShell>
      <Title>My Classes</Title>
      <Text>Below is a list of classes you are a part of.</Text>
    </CustomAppShell>
  );
};

export default ClassesImInPage;
