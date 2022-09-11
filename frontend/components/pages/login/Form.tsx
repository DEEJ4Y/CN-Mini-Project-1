import {
  TextInput,
  PasswordInput,
  Paper,
  Button,
  Loader,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { isValidEmail, isValidPassword } from "../../../utils/validate";
import { useRouter } from "next/router";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { loginService } from "../../../services/auth";
import { ApiResponse } from "../../../interfaces/Response";
import useAuth from "../../Auth";
import useMode from "../../Mode";

export default function LoginFormFields() {
  const form = useForm({
    initialValues: {
      email: "davidjosephind@gmail.com",
      password: "1234567890",
    },

    validate: {
      email: (v) => (!isValidEmail(v) ? "Please add a valid email" : null),
      password: (v) =>
        !isValidPassword(v) ? "Password must be at least 8 characters" : null,
    },
  });

  const router = useRouter();
  const [loading, loadingHandlers] = useDisclosure(false);
  const [error, setError] = useState("");
  const { setToken, isLoggedIn } = useAuth();
  const { getPreferredUserMode } = useMode();

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/app/" + getPreferredUserMode() + "/classes");
    }
  }, [isLoggedIn]);

  const onSubmit = async () => {
    if (form.isValid()) {
      loadingHandlers.open();
      const data = (await loginService(form.values)) as ApiResponse | null;

      // console.log(data);

      if (data === null) {
        loadingHandlers.close();
        setError("Failed to connect to servers... Please try again later.");
      } else if (!data.success) {
        loadingHandlers.close();
        if (data.error) {
          setError(data.error);
        }
      } else if (data.success) {
        loadingHandlers.close();
        if (data.token) {
          setToken(data.token);

          const preferredUserMode = getPreferredUserMode();

          if (!preferredUserMode) {
            router.push("/app/teacher/classes");
          } else {
            router.push("/app/" + preferredUserMode + "/classes");
          }
        } else {
          setError("Error... Login failed");
        }
      }
    } else {
      form.validate();
    }
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form onBlur={form.validate} onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          required
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...form.getInputProps("password")}
        />

        <Text mt="md" color="red">
          {error}
        </Text>

        <Button fullWidth mt="xl" type="submit" disabled={loading}>
          {loading ? <Loader size={16} /> : "Login"}
        </Button>
      </form>
    </Paper>
  );
}
