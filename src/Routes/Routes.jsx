import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import PropertyDetail from "../Pages/Home/Demo Properties/PropertyDetail";
import ManageProperties from "../Pages/ManageProperties/ManageProperties";
import AddProperty from "../Pages/Add Property/AddProperty";
import AllProperties from "../Pages/AllProperties/AllProperties";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/property/:id",
        element: <PropertyDetail />,
      },
      {
        path: "/add-property",
        element: <AddProperty />,
      },
      {
        path: "/manage-property",
        element: <ManageProperties />,
      },
      {
        path: "/edit-property/:id",
        element: <ManageProperties />,
      },
      {
        path: "/all-properties",
        element: <AllProperties />,
      },
    ],
  },
]);
