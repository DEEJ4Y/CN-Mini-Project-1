import {
  Text,
  TextInput,
  PasswordInput,
  Paper,
  Button,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { ApiResponse } from "../../../interfaces/Response";
import { signupService } from "../../../services/auth";
import {
  isValidEmail,
  isValidPassword,
  stringIsEmpty,
} from "../../../utils/validate";
export default function SignupFormFields() {
  const form = useForm({
    initialValues: {
      name: "David Joseph",
      email: "davidjosephind@gmail.com",
      password: "1234567890",
      confirmPassword: "1234567890",
    },

    validate: {
      name: (v) => (stringIsEmpty(v) ? "Please add a name" : null),
      email: (v) => (!isValidEmail(v) ? "Please add a valid email" : null),
      password: (v) =>
        !isValidPassword(v) ? "Password must be at least 8 characters" : null,
      confirmPassword: (v, vs) =>
        v !== vs.password ? "Confirm password should match password" : null,
    },
  });
  const router = useRouter();
  const [loading, loadingHandlers] = useDisclosure(false);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    if (form.isValid()) {
      loadingHandlers.open();
      const data = (await signupService(form.values)) as ApiResponse | null;

      // console.log(data);

      if (data === null) {
        loadingHandlers.close();
        setError("Failed to connect to servers... Please try later");
      } else if (!data.success) {
        loadingHandlers.close();
        if (data.error) {
          setError(data.error);
        }
      } else if (data.success) {
        loadingHandlers.close();
        router.push("/signup-success");
      }
    } else {
      form.validate();
    }
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form onBlur={form.validate} onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Full Name"
          placeholder="Your Name"
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Email"
          placeholder="you@example.com"
          required
          mt="md"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Your password"
          required
          mt="md"
          {...form.getInputProps("confirmPassword")}
        />

        <Text mt="md" color="red">
          {error}
        </Text>

        <Button fullWidth mt="xl" type="submit" disabled={loading}>
          {loading ? <Loader size={16} /> : "Sign up"}
        </Button>
      </form>
    </Paper>
  );
}
