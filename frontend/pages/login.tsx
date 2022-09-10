import type { NextPage } from "next";
import { Navbar } from "../components/Navbar";
import { LoginForm } from "../components/pages/login/LoginForm";

const Login: NextPage = () => {
  return (
    <>
      <Navbar />
      <div className="main">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
