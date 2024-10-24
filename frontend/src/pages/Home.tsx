import React from "react";

import Slider from "../components/Slider/Slider";

import UserSection from "../components/Sections/UserSection/UserSection";
const Home: React.FC = () => {
  return (
    <div className="mt-6">
      <Slider />
      <UserSection />
      <UserSection />
      <UserSection />
    </div>
  );
};

export default Home;
