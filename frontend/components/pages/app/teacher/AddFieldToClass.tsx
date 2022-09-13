import { useForm } from "@mantine/form";
import { stringIsEmpty } from "../../../../utils/validate";
import { useRouter } from "next/router";
import useAuth from "../../../Auth";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { addFieldToClass, ClassData } from "../../../../services/class";
import { queryClient } from "../../../../pages/_app";
import { Text, Button, Loader, TextInput, Select } from "@mantine/core";

export default function AddFieldToClassForm() {
  const form = useForm({
    initialValues: {
      key: "",
      valueType: "Text",
    },

    validate: {
      key: (v) => (stringIsEmpty(v) ? "Please add a field name" : null),
      valueType: (v) =>
        stringIsEmpty(v) ? "Please choose a type for the field" : null,
    },
  });

  const router = useRouter();
  const { getUserToken } = useAuth();
  const [loading, loadingHandlers] = useDisclosure(false);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    if (form.isValid()) {
      const classId = router.query.c;
      loadingHandlers.open();
      const data = await addFieldToClass(
        getUserToken() as string,
        { ...form.values, classId } as ClassData
      );

      console.log(data);

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
        queryClient.invalidateQueries(["teacher", "class", classId]);
        router.push(`/app/teacher/classes/view?c=${classId}`);
      }
    } else {
      form.validate();
    }
  };

  return (
    <form onBlur={form.validate} onSubmit={form.onSubmit(onSubmit)}>
      <div>
        <TextInput
          label="Field Name"
          placeholder="address"
          required
          {...form.getInputProps("key")}
          mb="sm"
        />
        <Select
          label="Field Type"
          required
          {...form.getInputProps("valueType")}
          mb="sm"
          data={["Number", "Text"]}
          searchable
        />

        <Text mt="md" color="red">
          {error}
        </Text>

        <Button type="submit" disabled={loading}>
          {loading ? <Loader size={16} /> : "Create Field"}
        </Button>
      </div>
    </form>
  );
}
