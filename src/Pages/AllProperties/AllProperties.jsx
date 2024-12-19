import React, { useState, useEffect } from "react";
import propertiesData from "../../../public/properties.json"; // Importing properties data from a local JSON file
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const AllProperties = () => {
  const [properties, setProperties] = useState([]); // State to store all properties
  const [filteredProperties, setFilteredProperties] = useState([]); // State to store filtered properties based on search and filters
  const [searchQuery, setSearchQuery] = useState(""); // State to handle search query input
  const [location, setLocation] = useState(""); // State to handle location filter
  const [type, setType] = useState(""); // State to handle property type filter
  const [priceRange, setPriceRange] = useState([0, 100000000]); // State to handle price range filter
  const [sortOrder, setSortOrder] = useState("default"); // State for sorting properties (e.g., by price or location)

  useEffect(() => {
    // On component mount, retrieve properties data from localStorage
    const savedProperties =
      JSON.parse(localStorage.getItem("properties")) || [];
    // Combine saved properties with properties from the JSON file
    const allProperties = [...savedProperties, ...propertiesData];
    setProperties(allProperties); // Set all properties to state
    setFilteredProperties(allProperties); // Initially, show all properties
  }, []);

  // Function to apply sorting to the properties list based on selected sorting option
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

  // Function to filter properties based on search query and filter values
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

    // Sort the filtered properties immediately after filtering
    filtered = sortProperties(filtered);

    setFilteredProperties(filtered); // Update the state with the filtered and sorted properties
  };

  // Function to handle changes in the search input field
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query state
  };

  // Function to handle changes in the filter inputs (location, type, price range)
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "location") setLocation(value);
    if (name === "type") setType(value);
    if (name === "price") setPriceRange(value.split(",").map(Number));
  };

  // Function to handle sorting order change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value); // Update the sort order state
  };

  // Apply filters and sorting whenever these change (searchQuery, location, type, priceRange, sortOrder)
  useEffect(() => {
    filterProperties(); // Reapply filters whenever any of the filter or sort values change
  }, [searchQuery, location, type, priceRange, sortOrder]);

  // Call filterProperties again when properties are updated (e.g., from localStorage)
  useEffect(() => {
    filterProperties(); // Reapply filters when the properties list changes
  }, [properties]);

  return (
    <div className="p-4">
      {/* Set the page title using Helmet for better SEO */}
      <Helmet>
        <title>All Properties | Prop_Manager</title>
      </Helmet>
      <h1 className="text-3xl font-bold my-4 mb-8 text-center">
        All Properties
      </h1>
      {/* Search and Filter Inputs */}
      <div className="flex space-x-4 mb-6">
        {/* Search input for querying properties */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered"
        />
        {/* Dropdown for selecting location filter */}
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
        {/* Dropdown for selecting property type filter */}
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
        {/* Dropdown for selecting price range filter */}
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
        {/* Dropdown for selecting sorting order */}
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
                {/* Property Location and Status */}
                <h3 className="text-xl font-semibold mt-2">
                  {property.location}
                </h3>
                <h3 className="text-xl mt-2 font-thin">{property.status}</h3>
              </div>
              <p className="text-gray-500">{property.type}</p>
              {/* Property Price */}
              <p className="text-lg font-semibold">${property.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
