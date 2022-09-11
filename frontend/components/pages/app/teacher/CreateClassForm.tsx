import { useForm } from "@mantine/form";
import { stringIsEmpty } from "../../../../utils/validate";
import { useRouter } from "next/router";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Class, createClass } from "../../../../services/class";
import useAuth from "../../../Auth";
import { Button, Loader, Text, TextInput } from "@mantine/core";
import { queryClient } from "../../../../pages/_app";
export default function CreateClassForm() {
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },

    validate: {
      name: (v) => (stringIsEmpty(v) ? "Please add a class name" : null),
    },
  });

  const router = useRouter();
  const { getUserToken } = useAuth();
  const [loading, loadingHandlers] = useDisclosure(false);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    if (form.isValid()) {
      loadingHandlers.open();
      const data = await createClass(
        getUserToken() as string,
        form.values as Class
      );

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
        queryClient.invalidateQueries(["teacher", "classes"]);
        router.push("/app/teacher/classes");
      }
    } else {
      form.validate();
    }
  };

  return (
    <form onBlur={form.validate} onSubmit={form.onSubmit(onSubmit)}>
      <div>
        <TextInput
          label="Class Name"
          placeholder="1A"
          required
          {...form.getInputProps("name")}
          mb="sm"
        />
        <TextInput
          label="Description"
          {...form.getInputProps("description")}
          mb="sm"
        />

        <Text mt="md" color="red">
          {error}
        </Text>

        <Button type="submit" disabled={loading}>
          {loading ? <Loader size={16} /> : "Create Class"}
        </Button>
      </div>
    </form>
  );
}
