import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../components/Home/Home";
import AllProducts from "../components/Navbar/AllProducts/AllProducts";
import Register from "../components/Register/Register";
import PrivateRouter from "./PrivateRouter";
import MyProducts from "../components/MyProducts/MyProducts";
import MyBids from "../components/MyBids/MyBids";
import ProductDetails from "../components/ProductDetails/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-products",
        Component: AllProducts,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/my-products",
        element: (
          <PrivateRouter>
            <MyProducts></MyProducts>
          </PrivateRouter>
        ),
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRouter>
            <MyBids></MyBids>
          </PrivateRouter>
        ),
      },
      {
        path: "/product-details/:id",
        loader: ({ params }) => {
          console.log("params:", params.id);
          return fetch(`http://localhost:3000/products/${params.id}`);
        },
        element: (
          <PrivateRouter>
            <ProductDetails></ProductDetails>
          </PrivateRouter>
        ),
      },
    ],
  },
]);
