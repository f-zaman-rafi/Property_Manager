import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]); // State to hold the properties
  const [editingProperty, setEditingProperty] = useState(null); // State for editing property
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // State to control delete confirmation popup
  const [propertyToDelete, setPropertyToDelete] = useState(null); // State to hold property to be deleted
  const [showEditPopup, setShowEditPopup] = useState(false); // State to control edit popup visibility

  // Fetch properties from localStorage when the component mounts
  useEffect(() => {
    const savedProperties =
      JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(savedProperties);
  }, []);

  // Handle edit button click (open popup with pre-filled data)
  const handleEdit = (property) => {
    setEditingProperty(property); // Set the current property for editing
    setShowEditPopup(true); // Open the edit popup
  };

  // Handle input change for inline editing in the popup
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save edited property to localStorage
  const saveEdit = () => {
    const updatedProperties = properties.map((prop) =>
      prop.id === editingProperty.id ? editingProperty : prop
    );
    setProperties(updatedProperties);
    localStorage.setItem("properties", JSON.stringify(updatedProperties));
    setShowEditPopup(false); // Close the edit popup
  };

  // Handle delete button click (show confirmation)
  const handleDelete = (property) => {
    setPropertyToDelete(property);
    setShowConfirmDelete(true);
  };

  // Handle the confirmation of deletion
  const confirmDelete = () => {
    const updatedProperties = properties.filter(
      (property) => property.id !== propertyToDelete.id
    );
    setProperties(updatedProperties);
    localStorage.setItem("properties", JSON.stringify(updatedProperties)); // Update localStorage
    setShowConfirmDelete(false); // Close the confirmation popup
  };

  // Handle canceling the deletion
  const cancelDelete = () => {
    setShowConfirmDelete(false); // Close the confirmation popup
  };

  return (
    <div className=" mx-auto p-8">
      <Helmet>
        <title>Manage Properties | Prop_Manager</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">Manage Properties</h1>

      {/* Display list of properties */}
      {properties.length === 0 ? (
        <p>No properties available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4">
              {/* Property Card */}
              <div className="border p-4 rounded-lg shadow-lg">
                <img
                  src={property.thumbnail}
                  alt={`Property in ${property.location}`}
                  className="w-full h-40 object-cover rounded-md"
                />
                <div className="flex justify-between">
                  <h3 className="text-xl font-semibold mt-2">
                    {property.location}
                  </h3>
                  <h3 className="text-xl mt-2 font-thin">{property.status}</h3>
                </div>
                <p className="text-gray-500">{property.type}</p>
                <p className="text-sm text-gray-500">Rooms: {property.rooms}</p>
                <p className="text-sm text-gray-500">
                  Bathrooms: {property.bathrooms}
                </p>
                <p className="text-sm text-gray-500">
                  {property.city}, {property.state}
                  <p className=" font-semibold">${property.price}</p>
                </p>

                {/* Buttons for Edit and Delete */}
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleEdit(property)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(property)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Popup for Deletion */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="text-lg font-semibold text-red-600">
              Are you sure you want to delete this property?
            </p>
            <div className="mt-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="ml-4 px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Popup */}
      {showEditPopup && editingProperty && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Property</h2>
            <form className="grid grid-cols-3 gap-5">
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
                  value={editingProperty.location}
                  onChange={handleChange}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md"
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
                  value={editingProperty.price}
                  onChange={handleChange}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md"
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
                  value={editingProperty.type}
                  onChange={handleChange}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md"
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
                  value={editingProperty.city}
                  onChange={handleChange}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md"
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
                  value={editingProperty.state}
                  onChange={handleChange}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md"
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
                  value={editingProperty.rooms}
                  onChange={handleChange}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md"
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
                  value={editingProperty.bathrooms}
                  onChange={handleChange}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <button
                type="button"
                onClick={saveEdit}
                className="w-full btn-md my-auto bg-blue-500 text-white rounded-md"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setShowEditPopup(false)}
                className="w-full btn-md my-auto bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProperties;
