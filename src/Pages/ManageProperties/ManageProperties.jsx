import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

const ManageProperties = () => {
  // State to manage the list of properties
  const [properties, setProperties] = useState([]);
  // State to manage the property being edited
  const [editingProperty, setEditingProperty] = useState(null);
  // State to control visibility of the delete confirmation
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  // State to manage the property to be deleted
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  // State to control visibility of the edit popup
  const [showEditPopup, setShowEditPopup] = useState(false);

  // Fetch properties from localStorage when component mounts
  useEffect(() => {
    const savedProperties =
      JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(savedProperties);
  }, []);

  // Handle edit button click, open popup with pre-filled data
  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowEditPopup(true); // Show the edit popup
  };

  // Handle input changes for inline editing in the popup
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProperty((prev) => ({
      ...prev,
      [name]: value, // Update the editing property with new values
    }));
  };

  // Save edited property back to localStorage
  const saveEdit = () => {
    const updatedProperties = properties.map((prop) =>
      prop.id === editingProperty.id ? editingProperty : prop
    );
    setProperties(updatedProperties);
    localStorage.setItem("properties", JSON.stringify(updatedProperties)); // Save changes in localStorage
    setShowEditPopup(false); // Close the edit popup
  };

  // Handle delete button click, show confirmation
  const handleDelete = (property) => {
    setPropertyToDelete(property);
    setShowConfirmDelete(true); // Show the delete confirmation popup
  };

  // Confirm the deletion and update the property list
  const confirmDelete = () => {
    const updatedProperties = properties.filter(
      (property) => property.id !== propertyToDelete.id
    );
    setProperties(updatedProperties);
    localStorage.setItem("properties", JSON.stringify(updatedProperties)); // Save updated list to localStorage
    setShowConfirmDelete(false); // Close the confirmation popup
  };

  // Cancel the deletion
  const cancelDelete = () => {
    setShowConfirmDelete(false); // Close the confirmation popup
  };

  return (
    <div className="mx-auto p-8">
      <Helmet>
        <title>Manage Properties | Prop_Manager</title> {/* Set page title */}
      </Helmet>
      <h1 className="text-3xl font-bold my-4 text-center mb-8">
        Manage Properties
      </h1>

      {/* Display properties or a message if no properties exist */}
      {properties.length === 0 ? (
        <p>No properties available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4">
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
                  <p className="font-semibold">${property.price}</p>
                </p>

                {/* Buttons for editing and deleting */}
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

      {/* Confirmation popup for property deletion */}
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

      {/* Edit property popup */}
      {showEditPopup && editingProperty && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Property</h2>
            <form className="grid grid-cols-3 gap-5">
              {/* Form inputs for editing property details */}
              {[
                "location",
                "price",
                "type",
                "city",
                "state",
                "rooms",
                "bathrooms",
              ].map((field) => (
                <div key={field} className="mb-4">
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={
                      field === "price" ||
                      field === "rooms" ||
                      field === "bathrooms"
                        ? "number"
                        : "text"
                    }
                    id={field}
                    name={field}
                    value={editingProperty[field]}
                    onChange={handleChange}
                    className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              ))}

              {/* Buttons for saving or canceling changes */}
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
