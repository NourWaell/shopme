import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@layouts/index";
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Cart = lazy(() => import("@pages/Cart"));
const Categories = lazy(() => import("@pages/Categories"));
const Error = lazy(() => import("@pages/Error"));
const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
const Products = lazy(() => import("@pages/Products"));
const Register = lazy(() => import("@pages/Register"));
const Wishlist = lazy(() => import("@pages/Wishlist"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback="Loading...">
            <Home />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback="Loading...">
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "wishlist",
        element: (
          <Suspense fallback="Loading...">
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense fallback="Loading...">
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "categories/products/:prefix",
        element: (
          <Suspense fallback="Loading...">
            <Products />
          </Suspense>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "about-us",
        element: (
          <Suspense fallback="Loading...">
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback="Loading...">
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback="Loading...">
            <Register />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
