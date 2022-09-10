import type { NextPage } from "next";
import { Navbar } from "../components/Navbar";
import { SignupForm } from "../components/pages/signup/SignupForm";

const Signup: NextPage = () => {
  return (
    <>
      <Navbar />
      <div className="main">
        <SignupForm />
      </div>
    </>
  );
};

export default Signup;
