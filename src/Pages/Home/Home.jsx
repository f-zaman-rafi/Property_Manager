import React from "react";
import Properties from "./Demo Properties/Properties"; // Importing the Properties component to display the properties
import { Helmet } from "react-helmet"; // Helmet for managing the document head

const Home = () => {
  return (
    <div>
      {/* Helmet to set the title of the page dynamically */}
      <Helmet>
        <title>Home | Prop_Manager</title>
      </Helmet>
      {/* Static title in case Helmet is not used */}
      <title>Prop_Manager</title>

      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-center my-8">Latest Properties</h1>

      {/* Properties component to display properties list */}
      <Properties />
    </div>
  );
};

export default Home;
