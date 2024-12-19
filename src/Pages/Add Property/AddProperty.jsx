import React, { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid"; // Import uuid

const AddProperty = () => {
  const [formData, setFormData] = useState({
    location: "",
    price: "",
    type: "",
    rooms: "",
    bathrooms: "",
    city: "",
    state: "",
    status: "", // Added status to formData
    thumbnail: "", // For thumbnail image URL
    photos: [], // Array to store multiple image URLs
  });

  const [showPopup, setShowPopup] = useState(false); // State for showing popup
  const navigate = useNavigate();

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change (for thumbnail image)
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = file ? URL.createObjectURL(file) : "";
    setFormData((prevData) => ({
      ...prevData,
      thumbnail: fileUrl, // Set the selected file as thumbnail
    }));
  };

  // Handle file input change (for photo uploads)
  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileUrls = Array.from(files).map((file) => URL.createObjectURL(file)); // Convert files to object URLs
    setFormData((prevData) => ({
      ...prevData,
      photos: fileUrls, // Store the selected photo URLs
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure there are two photos for the "photos" array
    if (formData.photos.length < 2) {
      alert("Please upload at least two photos.");
      return;
    }

    // Generate a unique ID using UUID
    const newProperty = {
      ...formData,
      id: uuidv4(), // Add a unique ID using UUID
    };

    // Save form data to localStorage
    const savedProperties =
      JSON.parse(localStorage.getItem("properties")) || [];
    savedProperties.push(newProperty); // Add the new property with ID
    localStorage.setItem("properties", JSON.stringify(savedProperties));

    // Show success popup and redirect to homepage
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate("/"); // Redirect after 2 seconds
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Add Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="rooms"
            className="block text-sm font-medium text-gray-700"
          >
            Rooms
          </label>
          <input
            type="number"
            id="rooms"
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="bathrooms"
            className="block text-sm font-medium text-gray-700"
          >
            Bathrooms
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Thumbnail file input */}
        <div className="mb-4">
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-700"
          >
            Thumbnail Image
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleThumbnailChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
          {formData.thumbnail && (
            <div className="mt-2">
              <img
                src={formData.thumbnail}
                alt="Thumbnail Preview"
                className="w-20 h-20 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        {/* File input for additional photos */}
        <div className="mb-4">
          <label
            htmlFor="photos"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Photos
          </label>
          <input
            type="file"
            id="photos"
            name="photos"
            multiple
            onChange={handleFileChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <div className="mt-2">
            {formData.photos.length > 0 && (
              <div className="flex gap-4">
                {formData.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Property Photo ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Status</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md"
        >
          Add Property
        </button>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="text-lg font-semibold text-green-600">
              Property Added Successfully!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProperty;
