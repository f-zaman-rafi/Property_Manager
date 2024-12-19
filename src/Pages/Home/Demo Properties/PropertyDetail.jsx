import React, { useState, useEffect } from "react";
import propertiesData from "../../../../public/properties.json"; // Import the data from a local JSON file
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Properties = () => {
  const [properties, setProperties] = useState([]); // State to store all properties
  const [filteredProperties, setFilteredProperties] = useState([]); // State to store filtered properties
  const [searchQuery, setSearchQuery] = useState(""); // State to handle search query input
  const [location, setLocation] = useState(""); // State to filter properties by location
  const [type, setType] = useState(""); // State to filter properties by type
  const [priceRange, setPriceRange] = useState([0, 100000000]); // State to filter properties by price range
  const [sortOrder, setSortOrder] = useState("default"); // State to handle sorting order of properties

  useEffect(() => {
    // On component mount, retrieve properties data from localStorage
    const savedProperties =
      JSON.parse(localStorage.getItem("properties")) || [];
    // Combine properties from localStorage and the imported JSON data
    const allProperties = [...savedProperties, ...propertiesData];
    setProperties(allProperties); // Set all properties in the state
    setFilteredProperties(allProperties); // Initially, display all properties
  }, []);

  // Function to apply sorting logic based on the selected sortOrder
  const sortProperties = (filtered) => {
    switch (sortOrder) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price); // Sort by price ascending
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price); // Sort by price descending
      case "location-asc":
        return filtered.sort((a, b) => a.location.localeCompare(b.location)); // Sort by location ascending
      case "location-desc":
        return filtered.sort((a, b) => b.location.localeCompare(a.location)); // Sort by location descending
      default:
        return filtered; // No sorting
    }
  };

  // Function to filter properties based on search query and selected filters
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
        property.price >= minPrice && // Filter by price range
        property.price <= maxPrice &&
        (searchQuery
          ? property.location
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) || // Filter by location or type based on search query
            property.type.toLowerCase().includes(searchQuery.toLowerCase())
          : true)
      );
    });

    // Sort the filtered properties immediately after filtering
    filtered = sortProperties(filtered);

    // Slice the filtered array to show only the first 10 results
    setFilteredProperties(filtered.slice(0, 10));
  };

  // Handle change for the search input field
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query state
  };

  // Handle change for filter inputs (location, type, price)
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "location") setLocation(value);
    if (name === "type") setType(value);
    if (name === "price") setPriceRange(value.split(",").map(Number));
  };

  // Handle change for sorting order selection
  const handleSortChange = (e) => {
    setSortOrder(e.target.value); // Update the sort order state
  };

  // Apply filters and sorting whenever these change (searchQuery, location, type, priceRange, sortOrder)
  useEffect(() => {
    filterProperties(); // Reapply filters and sorting on change
  }, [searchQuery, location, type, priceRange, sortOrder]);

  // Call filterProperties when the component mounts to show initial data
  useEffect(() => {
    filterProperties(); // Reapply filters when properties data is updated
  }, [properties]);

  return (
    <div className="p-4">
      {/* Search and Filter Inputs */}
      <div className="flex space-x-4 mb-6">
        {/* Search input field for query */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered"
        />
        {/* Dropdown for location filter */}
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
        {/* Dropdown for property type filter */}
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
        {/* Dropdown for price range filter */}
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
        {/* Sorting dropdown */}
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
              {/* Property Thumbnail */}
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

export default Properties;
