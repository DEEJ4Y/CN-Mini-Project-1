import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Loader, Container, Text, Title } from "@mantine/core";
import { addStudentToClass } from "../../../../services/class";
import useAuth from "../../../Auth";
import { queryClient } from "../../../../pages/_app";

export default function JoinClassAsStudent() {
  const router = useRouter();
  const { getUserToken } = useAuth();
  const [loading, setLoading] = useState("loading");

  useEffect(() => {
    if (loading === "loading" && router.isReady) {
      const res: any = (async () =>
        await addStudentToClass(
          getUserToken() as string,
          router.query?.c as string
        ))();

      if (!res || !res?.success) setLoading("fail");

      setLoading("success");
      queryClient.invalidateQueries(["teacher", "class", router.query.c]);
      router.push(`/app/student/classes/view?c=${router.query.c}`);
    }
  }, [router.isReady]);

  if (loading === "loading") {
    return (
      <Container
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader size={64} />
      </Container>
    );
  }

  if (loading === "fail") {
    return (
      <>
        <Title>Oops!</Title>
        <Text color="red">
          Something went wrong while joining the class. Please try again later.
        </Text>
      </>
    );
  }

  return (
    <>
      <Title>Success!</Title>
      <Text>Joined the class successfully.</Text>
    </>
  );
}
