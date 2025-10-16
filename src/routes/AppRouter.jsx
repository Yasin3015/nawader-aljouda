import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// 🧱 Layouts
const UserLayout = lazy(() => import("../layouts/UserLayout"));
// const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const AuthLayout = lazy(() => import("../Layouts/AuthLayout"));

// 📄 User Pages
const Home = lazy(() => import("../pages/user/Home"));
const About = lazy(() => import("../pages/user/About"));
const Contact = lazy(() => import("../pages/user/Contact"));
const Browse = lazy(() => import("../pages/user/Browse"));

// 📊 Dashboard Pages
// const DashboardHome = lazy(() => import("../pages/dashboard/DashboardHome"));
// const Users = lazy(() => import("../pages/dashboard/Users"));
// const Settings = lazy(() => import("../pages/dashboard/Settings"));

// 🔐 Auth Pages
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));

// 🌀 Loading Spinner
const Loading = () => (
  <div className="flex justify-center items-center min-h-screen text-[var(--color-primary)]">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--color-primary)]"></div>
  </div>
);

// 🧭 Router Config
const AppRouter = createBrowserRouter([
  // ========================
  // 🏠 User Routes
  // ========================
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <UserLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "browse",
        element: (
          <Suspense fallback={<Loading />}>
            <Browse />
          </Suspense>
        ),
      },
    ],
  },

  // ========================
  // 💼 Dashboard Routes
  // ========================
//   {
//     path: "/dashboard",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <DashboardLayout />
//       </Suspense>
//     ),
//     children: [
//       {
//         index: true,
//         element: (
//           <Suspense fallback={<Loading />}>
//             <DashboardHome />
//           </Suspense>
//         ),
//       },
//       {
//         path: "users",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Users />
//           </Suspense>
//         ),
//       },
//       {
//         path: "settings",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Settings />
//           </Suspense>
//         ),
//       },
//     ],
//   },

  // ========================
  // 🔐 Auth Routes
  // ========================
  {
    path: "/auth",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        ),
      },
    ],
  },

  // ========================
  // 🚫 404 Redirect
  // ========================
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default AppRouter;
