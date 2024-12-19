import React, { useState, useEffect } from "react";
import propertiesData from "../../../public/properties.json"; // Import the data from JSON
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [sortOrder, setSortOrder] = useState("default"); // New state for sorting order

  useEffect(() => {
    // Retrieve properties data from localStorage
    const savedProperties =
      JSON.parse(localStorage.getItem("properties")) || [];
    // Combine properties from localStorage and JSON
    const allProperties = [...savedProperties, ...propertiesData];
    setProperties(allProperties);
    setFilteredProperties(allProperties); // Show all properties initially
  }, []);

  // Apply sorting logic based on the selected sortOrder
  const sortProperties = (filtered) => {
    switch (sortOrder) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "location-asc":
        return filtered.sort((a, b) => a.location.localeCompare(b.location));
      case "location-desc":
        return filtered.sort((a, b) => b.location.localeCompare(a.location));
      default:
        return filtered;
    }
  };

  // Filter properties based on search and selected filters
  const filterProperties = () => {
    let filtered = properties.filter((property) => {
      const [minPrice, maxPrice] = priceRange;

      return (
        (location
          ? property.location.toLowerCase().includes(location.toLowerCase())
          : true) &&
        (type
          ? property.type.toLowerCase().includes(type.toLowerCase())
          : true) &&
        property.price >= minPrice &&
        property.price <= maxPrice &&
        (searchQuery
          ? property.location
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            property.type.toLowerCase().includes(searchQuery.toLowerCase())
          : true)
      );
    });

    // Sort the filtered properties immediately
    filtered = sortProperties(filtered);

    setFilteredProperties(filtered);
  };

  // Handle change for search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle change for filter inputs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "location") setLocation(value);
    if (name === "type") setType(value);
    if (name === "price") setPriceRange(value.split(",").map(Number));
  };

  // Handle change for sorting
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Apply filters and sorting whenever these change
  useEffect(() => {
    filterProperties();
  }, [searchQuery, location, type, priceRange, sortOrder]);

  // Call filterProperties when the component mounts to show initial data
  useEffect(() => {
    filterProperties();
  }, [properties]);

  return (
    <div className="p-4">
      <Helmet>
        <title>All Properties | Prop_Manager</title>
      </Helmet>
      <h1 className="text-3xl font-bold my-4 mb-8 text-center">
        All Properties
      </h1>
      {/* Search and Filter Inputs */}
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered"
        />
        <select
          name="location"
          value={location}
          onChange={handleFilterChange}
          className="select select-bordered"
        >
          <option value="">All Locations</option>
          {properties.map((property) => (
            <option key={property.id} value={property.location}>
              {property.location}
            </option>
          ))}
        </select>
        <select
          name="type"
          value={type}
          onChange={handleFilterChange}
          className="select select-bordered"
        >
          <option value="">All Types</option>
          {properties.map((property) => (
            <option key={property.id} value={property.type}>
              {property.type}
            </option>
          ))}
        </select>
        <select
          name="price"
          value={priceRange.join(",")}
          onChange={handleFilterChange}
          className="select select-bordered"
        >
          <option value="0,100000000">All Prices</option>
          <option value="0,100000">Up to $100,000</option>
          <option value="0,200000">Up to $200,000</option>
          <option value="0,500000">Up to $500,000</option>
          <option value="0,800000">Up to $800,000</option>
          <option value="0,1000000">Up to $1,000,000</option>
          <option value="0,2000000">Up to $2,000,000</option>
          <option value="0,3000000">Up to $3,000,000+</option>
        </select>
        {/* Sorting Select */}
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="select select-bordered"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="location-asc">Location: A-Z</option>
          <option value="location-desc">Location: Z-A</option>
        </select>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProperties.map((property) => (
          <Link
            to={{ pathname: `/property/${property.id}`, state: { property } }}
            key={property.id}
          >
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
              <p className="text-lg font-semibold">${property.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
