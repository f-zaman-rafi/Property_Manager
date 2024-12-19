import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PropertyDetail = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState(""); // State for the main image

  useEffect(() => {
    // Fetch data from the local JSON file
    fetch("/properties.json") // Path to your JSON file in the public folder
      .then((response) => response.json())
      .then((data) => {
        // Find the property with the matching ID
        const foundProperty = data.find(
          (property) => property.id === parseInt(id)
        );
        if (foundProperty) {
          setProperty(foundProperty);
          setMainImage(foundProperty.photos[0]); // Set the first photo as the main image
        }
      })
      .catch((error) => console.error("Error fetching property data:", error));
  }, [id]);

  if (!property) {
    return <p>Property not found.</p>; // Handle case where property is not found
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{property.location}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          {/* Main image */}
          <img
            src={mainImage} // Display the current main image
            alt={property.location}
            className="w-full h-80 object-cover rounded-md mb-4"
          />
          {/* Smaller images */}
          <div className="grid grid-cols-3 gap-4">
            {property.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                  mainImage === photo ? "ring-4 ring-blue-500" : ""
                }`} // Highlight the currently active image
                onClick={() => setMainImage(photo)} // Set clicked image as main image
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div>
          <p>
            <strong>Location:</strong> {property.location}
          </p>
          <p>
            <strong>City:</strong> {property.city}
          </p>
          <p>
            <strong>State:</strong> {property.state}
          </p>
          <p>
            <strong>Type:</strong> {property.type}
          </p>
          <p>
            <strong>Rooms:</strong> {property.rooms}
          </p>
          <p>
            <strong>Bathrooms:</strong> {property.bathrooms}
          </p>
          <p className="text-xl font-semibold mt-4">
            <strong>Price:</strong> ${property.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
