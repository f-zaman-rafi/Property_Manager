import React from "react";
import Properties from "./Demo Properties/Properties";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Prop_Manager</title>
      </Helmet>
      <title>Prop_Manager</title>
      <h1 className="text-3xl font-bold text-center my-8">Latest Properties</h1>
      <Properties />
    </div>
  );
};

export default Home;
