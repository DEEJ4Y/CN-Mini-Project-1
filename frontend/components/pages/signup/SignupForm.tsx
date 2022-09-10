import { Anchor, Title, Text, Container } from "@mantine/core";
import Link from "next/link";
import SignupFormFields from "./Form";

export function SignupForm() {
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Link passHref href={"/login"}>
          <Anchor<"a"> size="sm">Login</Anchor>
        </Link>
      </Text>

      <SignupFormFields />
    </Container>
  );
}
