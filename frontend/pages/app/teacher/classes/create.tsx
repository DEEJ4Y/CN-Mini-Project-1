import { Title, Text } from "@mantine/core";
import { NextPage } from "next";
import CustomAppShell from "../../../../components/AppShell";
import CreateClassForm from "../../../../components/pages/app/teacher/CreateClassForm";

const CreateClassPage: NextPage = () => {
  return (
    <CustomAppShell>
      <Title>Create a Class</Title>
      <Text mb="sm">Fill in the details to create your class.</Text>

      <CreateClassForm />
    </CustomAppShell>
  );
};

export default CreateClassPage;
