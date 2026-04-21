import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import AuthLayout from "./pages/AuthLayout";
import ProductDetails from "./pages/ProductDetails";
import SellerOnboarding from "./pages/SellerOnboarding";
import { ProtectedRoute } from "./components/ProtectedRoute";

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
  {
    path: "/seller/onboarding",
    element: (
      <ProtectedRoute>
        <SellerOnboarding />
      </ProtectedRoute>
    ),
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
