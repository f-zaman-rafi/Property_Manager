import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PropertyDetail = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState(""); // State for the main image
  const [isLocalStorage, setIsLocalStorage] = useState(false); // Flag to check if data is from localStorage

  useEffect(() => {
    // Fetch data from localStorage first
    const savedProperties =
      JSON.parse(localStorage.getItem("properties")) || [];
    console.log("Saved Properties from localStorage:", savedProperties); // Debug log to check the structure of localStorage data
    const foundProperty = savedProperties.find(
      (property) => property.id.toString() === id
    );

    console.log(foundProperty);

    if (foundProperty) {
      setIsLocalStorage(true); // Indicate that data is from localStorage
      setProperty(foundProperty);
      setMainImage(foundProperty.photos[0]); // Set the first photo as the main image
    } else {
      // If not found in localStorage, fall back to JSON data
      fetch("/properties.json") // Path to your JSON file in the public folder
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched properties from JSON:", data); // Debug log to check the structure of JSON data
          const foundFromJson = data.find(
            (property) => property.id === parseInt(id)
          );
          if (foundFromJson) {
            setIsLocalStorage(false); // Indicate that data is from JSON
            setProperty(foundFromJson);
            setMainImage(foundFromJson.photos[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching property data:", error);
        });
    }
  }, [id]); // Depend on the `id` parameter from the URL

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
          <p>
            <strong>Status:</strong> {property.status}
          </p>
          <p className="text-xl font-semibold mt-4">
            <strong>Price:</strong> ${property.price}
          </p>
        </div>
      </div>

      {/* Display the source of the data */}
      <div className="mt-4 text-gray-500 text-sm">
        {isLocalStorage
          ? "Data fetched from localStorage"
          : "Data fetched from JSON"}
      </div>
    </div>
  );
};

export default PropertyDetail;
