import { Outlet } from "react-router"; // Import Outlet for rendering child routes
import Navbar from "../SharedComponents/Navbar/Navbar"; // Import Navbar for consistent navigation

// Main component serves as the layout wrapper for the app
const Main = () => {
  return (
    <div>
      {/* Render Navbar component for navigation at the top of the page */}
      <Navbar />

      {/* Outlet renders the matched child route */}
      <Outlet />
    </div>
  );
};

export default Main; // Export Main component for use in routing
