import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from JSON (or API if available)
        const jsonResponse = await fetch("../../../public/properties.json");
        const jsonData = await jsonResponse.json();
        console.log("Fetched JSON Data:", jsonData);

        // Get data from localStorage if available
        const localStorageData =
          JSON.parse(localStorage.getItem("properties")) || [];
        console.log("LocalStorage Data:", localStorageData);

        // Combine the data properly, ensuring both are arrays
        const combinedData = [...jsonData, ...localStorageData]; // Combine both arrays
        console.log("Combined Data:", combinedData);
        setProperties(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateMedian = (prices) => {
    prices.sort((a, b) => a - b);
    const middle = Math.floor(prices.length / 2);
    if (prices.length % 2 === 0) {
      return (prices[middle - 1] + prices[middle]) / 2;
    } else {
      return prices[middle];
    }
  };

  if (properties.length === 0) {
    return <div>Loading...</div>;
  }

  const locations = [
    ...new Set(properties.map((property) => property.location)),
  ];
  const medianPrices = locations.map((location) => {
    const locationPrices = properties
      .filter((property) => property.location === location)
      .map((property) => property.price);
    return calculateMedian(locationPrices);
  });

  const propertyCounts = locations.map((location) => {
    return properties.filter((property) => property.location === location)
      .length;
  });

  const medianPriceData = {
    labels: locations,
    datasets: [
      {
        label: "Median Property Price",
        data: medianPrices,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const propertyCountData = {
    labels: locations,
    datasets: [
      {
        label: "Number of Properties",
        data: propertyCounts,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Property Statistics</h2>

      <div className="chart-container">
        <h3>Median Property Price by Location</h3>
        <Bar data={medianPriceData} options={{ responsive: true }} />
      </div>

      <div className="chart-container mt-8">
        <h3>Number of Properties in Each Locality</h3>
        <Bar data={propertyCountData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Statistics;
