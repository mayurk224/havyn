import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import AuthLayout from "./pages/AuthLayout";
import ProductDetails from "./pages/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <AuthLayout />,
  },
  {
    path: "/signup",
    element: <AuthLayout />,
  },
  {
    path: "/product-detail",
    element: <ProductDetails />,
  },
  //   {
  //     path: "/terms",
  //     element: <Terms />,
  //   },
  //   {
  //     path: "/privacy",
  //     element: <LegalPrivacy />,
  //   },
]);
