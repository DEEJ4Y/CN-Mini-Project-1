import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useAuth() {
  const router = useRouter();
  const [token, setUserToken] = useState(null as string | null);

  useEffect(() => {
    const userToken = window.localStorage.getItem("t");
    if (!userToken) {
      if (router.pathname.startsWith("/app")) {
        router.push("/login", { query: { redirect: router.pathname } });
      }
    } else {
      setUserToken(() => userToken);
    }
  }, [router, token, setUserToken]);

  const setToken = (_token: string) => {
    window.localStorage.setItem("t", _token);

    setUserToken(() => _token);
  };

  const isLoggedIn = () => {
    if (token === null) return false;

    return true;
  };

  const logout = () => {
    window.localStorage.removeItem("t");

    setUserToken(() => null);

    router.push("/login");
  };

  const getUserToken = () => {
    const userToken = window.localStorage.getItem("t");

    setUserToken(() => userToken);

    return userToken;
  };

  return { token, setToken, isLoggedIn, logout, getUserToken };
}
