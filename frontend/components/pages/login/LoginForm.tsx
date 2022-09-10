import { Anchor, Title, Text, Container } from "@mantine/core";
import Link from "next/link";
import LoginFormFields from "./Form";

export function LoginForm() {
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Link passHref href={"/signup"}>
          <Anchor<"a"> size="sm">Create account</Anchor>
        </Link>
      </Text>

      <LoginFormFields />
    </Container>
  );
}
