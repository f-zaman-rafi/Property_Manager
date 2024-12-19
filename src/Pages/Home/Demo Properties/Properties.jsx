import React, { useState, useEffect } from "react";
import propertiesData from "../../../../public/properties.json"; // Import the data
import { Link } from "react-router";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Set the latest 10 properties from the JSON data
    setProperties(propertiesData.slice(0, 10));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {properties.map((property) => (
        <Link
          to={{ pathname: `/property/${property.id}`, state: { property } }}
        >
          <div key={property.id} className="border p-4 rounded-lg shadow-lg">
            <img
              src={property.thumbnail}
              alt={`Property in ${property.location}`}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-2">{property.location}</h3>
            <p className="text-gray-500">{property.type}</p>
            <p className="text-lg font-semibold">${property.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Properties;
