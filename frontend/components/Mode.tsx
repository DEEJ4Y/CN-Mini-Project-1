import { useToggle } from "@mantine/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";

export enum PreferredUserMode {
  student = "student",
  teacher = "teacher",
}

export default function useMode() {
  const router = useRouter();
  const [userMode, toggleUserMode] = useToggle<"teacher" | "student">([
    "teacher",
    "student",
  ]);

  useEffect(() => {
    if (router.pathname.startsWith("/app/teacher")) {
      window.localStorage.setItem("m", "teacher");
      toggleUserMode("teacher");
    } else if (router.pathname.startsWith("/app/student")) {
      window.localStorage.setItem("m", "student");
      toggleUserMode("student");
    }
  }, [router.pathname, userMode, toggleUserMode]);

  const getPreferredUserMode = () => {
    const preferredUserMode = window.localStorage.getItem(
      "m"
    ) as PreferredUserMode;

    if (preferredUserMode) {
      return preferredUserMode;
    }

    return null;
  };

  const getNextUserMode = () => {
    if (userMode) {
      if (userMode === "teacher") return "student";
      if (userMode === "student") return "teacher";
    }

    return "teacher";
  };

  return { userMode, toggleUserMode, getNextUserMode, getPreferredUserMode };
}
