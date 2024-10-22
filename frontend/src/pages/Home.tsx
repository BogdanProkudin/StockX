import React from "react";

import Slider from "../components/Slider/Slider";
import styles from "../components/Sections/rootStyles.module.scss";
import UserSection from "../components/Sections/UserSection/UserSection";
const Home: React.FC = () => {
  return (
    <div className="mt-6">
      <Slider />
      <UserSection />
    </div>
  );
};

export default Home;
