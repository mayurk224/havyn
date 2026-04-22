import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import AuthLayout from "./pages/AuthLayout";
import ProductDetails from "./pages/ProductDetails";
import SellerOnboarding from "./pages/SellerOnboarding";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CreateProduct from "./pages/CreateProduct";
import ProductsFeed from "./pages/ProductsFeed";

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
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/seller/onboarding",
    element: (
      <ProtectedRoute>
        <SellerOnboarding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/seller/create-product",
    element: (
      <ProtectedRoute>
        <CreateProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products",
    element: <ProductsFeed />,
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
