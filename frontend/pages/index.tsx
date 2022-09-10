import type { NextPage } from "next";
import { Navbar } from "../components/Navbar";
import { HeroTitle } from "../components/pages/index/Header";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <div className="main">
        <HeroTitle />
      </div>
    </>
  );
};

export default Home;
