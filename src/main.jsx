import React from "react"; // Import React for JSX syntax support
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering to the DOM
import { RouterProvider } from "react-router-dom"; // Import RouterProvider for routing functionality
import "./index.css"; // Import custom CSS styles
import { router } from "./Routes/Routes"; // Import the router configuration

// Render the application to the root element in the DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* The RouterProvider component provides the routing functionality */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
