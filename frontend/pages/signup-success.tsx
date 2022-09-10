import { NextPage } from "next";
import { Navbar } from "../components/Navbar";
import { Text, Title, Container } from "@mantine/core";

const SignupSuccess: NextPage = () => {
  return (
    <>
      <Navbar />
      <div className="main">
        <Container fluid py={40}>
          <Title order={1} align="center" mb={16}>
            Success!
          </Title>
          <Text align="center">
            You have registered for Student Management System successfully.
          </Text>
          <Text align="center">
            We have sent you an email to your registered email address. Verify
            your account by clicking on the link in the email.
          </Text>
          <Text align="center">
            Once verified, you can login with your verified account.
          </Text>
        </Container>
      </div>
    </>
  );
};

export default SignupSuccess;
