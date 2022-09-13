import { NextPage } from "next";
import CustomAppShell from "../../../../../components/AppShell";
import { Button, Text, Title, TextInput } from "@mantine/core";
import { useRouter } from "next/router";
import { Link } from "tabler-icons-react";
import { useClipboard } from "@mantine/hooks";

const InviteStudent: NextPage = () => {
  const router = useRouter();
  const { copy, copied } = useClipboard();

  const joiningLink = `${window?.location?.protocol}//${window?.location?.host}/app/student/classes/join?c=${router?.query?.c}`;

  const copyJoiningLink = () => {
    copy(joiningLink);
  };

  return (
    <CustomAppShell>
      <Title>Invite a student</Title>
      <Text>
        Students can join your classroom once they have signed up on Student
        Management System. Share the below link only with your students.
      </Text>
      <Text mt="md" weight="bold">
        Joining link
      </Text>
      <TextInput value={joiningLink} disabled />
      <div>
        <Button
          variant="filled"
          leftIcon={<Link size={20} />}
          mt="sm"
          style={{ display: "inline" }}
          onClick={copyJoiningLink}
        >
          {copied ? "Copied!" : "Copy Joining Link"}
        </Button>
      </div>
    </CustomAppShell>
  );
};

export default InviteStudent;
